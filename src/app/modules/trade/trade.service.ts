import { BinanceApiService, OrderParams, Ticker24Hr, Tickers, UserData } from '@arbitrage-libs/broker-api';
import { Config } from '@arbitrage-libs/config';
import { Logger } from '@arbitrage-libs/logger';
import { add, ceil, divide, floor, getBigNumber, gt, gte, lt, multiple, subtract } from '@arbitrage-libs/util';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Balance, Market, Order } from 'ccxt';

import { Edge, TradeEdge, TradeStatus, TradeTriangle, Triangle } from '../../models';
import { OnDestroyService } from '../../shared';

interface AssetBalance extends Balance {
  asset: string;
}

@Injectable()
export class TradeService extends OnDestroyService implements OnModuleInit {
  private executeMap = new Map<string, TradeTriangle>();
  private rest = this.binanceApi.rest;
  private ws = this.binanceApi.ws;

  constructor(private logger: Logger, private binanceApi: BinanceApiService) {
    super();
  }

  onModuleInit(): void {
    this.ws.getUserData$().subscribe((data) => {
      if (data.eventType === 'executionReport' && data.orderStatus === 'FILLED') {
        this.onOrderFilled(data);
        return;
      }
      this.logger.debug('getUserData$', `订阅数据:${JSON.stringify(data, null, 2)}`);
    });
  }

  onOrderFilled(data: UserData): void {
    this.logger.debug('onOrderFilled', `订阅数据:${JSON.stringify(data, null, 2)}`);
    this.executeMap.forEach(async (execute) => {
      const index = execute.edges.findIndex((o) => o.id === data.newClientOrderId);
      if (index >= 2) {
        this.logger.log('TradeService', `${execute.id}已完成套利!`);
        this.executeMap.delete(execute.id);
        return;
      }
      const nextEdge = execute.edges[index + 1];
      this.logger.log('TradeService', `${execute.edges[index].pair}已成交，执行下一阶段${nextEdge.pair}交易...`);
      await this.order(nextEdge);
    });
  }

  async start(triangles: Triangle[], tickers: Tickers): Promise<void> {
    if (this.executeMap.size >= Config.root.sessionLimit) {
      return;
    }
    const bestCandidate = triangles[0];

    const cEdge = bestCandidate.edges[2];
    let asset;
    if (cEdge.toAsset !== 'BTC') {
      asset = tickers[`${cEdge.toAsset}BTC`];
      if (!asset) {
        asset = tickers[`BTC${cEdge.toAsset}`];
      }
    }
    if (!checkMinAmount(cEdge, asset) || !this.checkTradeCost(bestCandidate.rate)) {
      return;
    }

    this.logger.log('TradeService', `采用第一名候补者:${bestCandidate.id},开始套利...`);
    this.logger.debug('TradeService', `候补者信息: ${JSON.stringify(bestCandidate)}`);
    const tradeTriangle = await this.getTradeTriangle(bestCandidate);
    await this.executeTrade(tradeTriangle);
  }

  /**
   * 执行套利交易
   *
   * @param tradeTriangle
   */
  async executeTrade(tradeTriangle: TradeTriangle): Promise<void> {
    tradeTriangle.status = TradeStatus.Open;
    tradeTriangle.openTime = Date.now();
    this.logger.log('TradeService', `开始执行套利交易:${JSON.stringify(tradeTriangle)}`);
    this.executeMap.set(tradeTriangle.id, tradeTriangle);

    await this.order(tradeTriangle.edges[0]);
  }

  private async order(edge: TradeEdge): Promise<Order | undefined> {
    edge.status = TradeStatus.Open;
    this.logger.log('TradeService', `执行限价单:${edge.pair}, 限价：${edge.price}, 数量：${edge.quantity}, 方向：${edge.side}`);

    const orderParams: OrderParams = {
      symbol: edge.pair,
      side: edge.side,
      type: 'limit',
      price: edge.price,
      amount: edge.quantity,
      newClientOrderId: edge.id,
    };
    const orderInfo = await this.rest.createOrder(orderParams);
    if (!orderInfo) {
      return;
    }
    this.logger.debug('TradeService', `下单返回值: ${JSON.stringify(orderInfo, null, 2)}`);

    return orderInfo;
  }

  /**
   * 检查交易成本
   *
   * @param crossRate 预期交叉汇率
   * @private
   */
  private checkTradeCost(crossRate: string): boolean {
    const fee = Config.activeBroker.fee;
    let result = true;
    if (!gt(crossRate, fee)) {
      result = false;
      this.logger.log('TradeService-checkTradeCost', `预期交叉汇率(${crossRate}) < 交易成本(${fee}), 退出套利...`);
    }

    return result;
  }

  /**
   * 获得可交易三角组合信息
   *
   * @param triangle
   * @private
   */
  async getTradeTriangle(triangle: Triangle): Promise<TradeTriangle> {
    const balance = await this.rest.getBalance();
    const freeAssetList: AssetBalance[] = [];
    for (const assetName of Object.keys(balance)) {
      if (balance[assetName].free > 0) {
        freeAssetList.push({ asset: assetName, ...balance[assetName] });
      }
    }
    if (freeAssetList.length === 0) {
      this.logger.warn('TradeService-getTradeTriangle', `未查找到持有资产!!`);
      return;
    }

    this.logger.info('TradeService-getTradeTriangle', triangle.rate);
    const [a, b, c] = triangle.edges;

    // 使用货币
    const useAssetA = a.fromAsset;
    const balanceA = balance[useAssetA];
    if (!balanceA || getBigNumber(balanceA.free).isZero()) {
      this.logger.warn('TradeService-getTradeTriangle', `未查找到持有A边(${a.pair})的报价货币(${useAssetA})资产!!`);
      return;
    }

    const pairInfoA = this.getPairInfo(a.pair);
    const pairInfoB = this.getPairInfo(b.pair);
    if (!pairInfoA || !pairInfoB) {
      return;
    }

    const feeA = this.rest.pairFees[a.pair].maker;
    const minAmountA = getEdgeAAmount(a, pairInfoA, feeA);

    // 可用余额 < 使用货币最小交易量
    if (lt(balanceA.free, minAmountA)) {
      this.logger.info('TradeService-getTradeTriangle', `${useAssetA}的可用余额(${balanceA.free}),小于最小交易量(${minAmountA} )！！`);
      return;
    }

    const tradeEdgeA = initTradeEdge(a, minAmountA, feeA);
    const actualAmountA = getActualAmount(tradeEdgeA, feeA);
    const precisionAmountB = pairInfoB.precision.amount;

    const feeB = this.rest.pairFees[b.pair].maker;

    const feeC = this.rest.pairFees[c.pair].maker;
    let amountB = floor(divide(actualAmountA, b.price), precisionAmountB).toNumber();
    if (feeB > 0) {
      this.logger.info('TradeService-getTradeTriangle', `B边手续费(${feeB}),重新计算A边订单数量。`);
      amountB = ceil(add(amountB, multiple(amountB, feeB)), precisionAmountB).toNumber();
      const expectFilledAmount = multiple(amountB, b.price);
      tradeEdgeA.quantity = ceil(divide(expectFilledAmount, a.price), pairInfoA.precision.amount).toNumber();
    }
    const tradeEdgeB = initTradeEdge(b, amountB, feeB);
    const actualAmountB = floor(getActualAmount(tradeEdgeB, feeB), precisionAmountB).toNumber();

    const tradeEdgeC = initTradeEdge(c, actualAmountB, feeC);

    return {
      ...triangle,
      openTime: 0,
      status: TradeStatus.Todo,
      edges: [tradeEdgeA, tradeEdgeB, tradeEdgeC],
    };
  }

  private getPairInfo(pairName: string): Market | undefined {
    const pairInfo = this.rest.getPairInfo(pairName);
    if (!pairInfo) {
      this.logger.warn('TradeService-getPairMinAmount', `未查找到(${pairName})的交易对信息!!`);
      return;
    }

    return pairInfo;
  }
}

export function checkMinAmount(cEdge: Edge, ticker?: Ticker24Hr): boolean {
  const toAssetFn = cEdge.side === 'sell' ? multiple : divide;
  const toAssetAmount = toAssetFn(cEdge.quantity, cEdge.price);
  // ticker不传值时，则此标的报价货币为BTC
  let btcAmount = toAssetAmount;
  if (ticker) {
    // btc实际汇率价格
    const btcRatePrice = +ticker.currentClose;
    // 判断标的货币是否为报价货币，报价货币时 除法
    const toBtcFn = ticker.symbol === `BTC${cEdge.toAsset}` ? divide : multiple;
    btcAmount = floor(toBtcFn(toAssetAmount, btcRatePrice), 8);
  }

  return gte(btcAmount, Config.root.minAmount);
}

function initTradeEdge(edge: Edge, quantity: number, fee: number): TradeEdge {
  return {
    ...edge,
    quantity,
    fee,
    id: `${edge.pair.replace('/', '')}_${Date.now()}`,
    status: TradeStatus.Todo,
  };
}

/**
 * 获得下单成交后的实际数量
 *
 * 剩余数量 = 订单数量 - (订单数量 x 手续费)
 * 实际数量 = '购买' ? 剩余数量 : 剩余数量 x 订单价格
 * @param edge
 * @param fee
 */
function getActualAmount(edge: TradeEdge, fee: number): number {
  // 剩余数量 = 订单数量 - (订单数量 x 手续费)
  const remainingAmount = subtract(edge.quantity, multiple(edge.quantity, fee)).toNumber();

  return edge.side === 'buy' ? remainingAmount : multiple(remainingAmount, edge.price).toNumber();
}

export function getEdgeAAmount(edge: Edge, pairInfo: Market, fee: number): number {
  const limits = pairInfo.limits;
  const precision = pairInfo.precision.amount;
  const minAmount = divide(limits.cost.min, edge.price);
  const attachedAmount = add(fee, multiple(minAmount, 0.1));

  return floor(add(minAmount, attachedAmount), precision).toNumber();
}
