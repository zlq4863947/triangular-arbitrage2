import { Injectable, OnModuleInit } from '@nestjs/common';
import { Tickers } from '@ta2-libs/broker-api';
import {
  CatchError,
  add,
  ceil,
  divide,
  floor,
  floorToString,
  getBigNumber,
  getEdgeOrderAmount,
  lt,
  multiple,
  subtract,
} from '@ta2-libs/common';
import { Config } from '@ta2-libs/config';
import { Logger } from '@ta2-libs/logger';
import { Balance, Market } from 'ccxt';

import { DefaultExceptionHandler } from '../../exceptions';
import { Edge, Strategy, TradeEdge, TradeStatus, TradeTriangle, Triangle } from '../../models';
import { DataService } from '../data';
import { OnDestroyService } from '../shared';

interface AssetBalance extends Balance {
  asset: string;
}

@Injectable()
@CatchError(DefaultExceptionHandler)
export class TradeService extends OnDestroyService implements OnModuleInit {
  private name = 'TradeService';
  private sessionMap = new Map<string, TradeTriangle>();

  constructor(private logger: Logger, private dataService: DataService, private strategy: Strategy) {
    super();
  }

  onModuleInit(): void {
    this.strategy.getResult$().subscribe((triangleId: string) => {
      const session = this.sessionMap.get(triangleId);
      if (session) {
        this.sessionMap.delete(triangleId);
      }
    });
  }

  async start(bestCandidate: Triangle, tickers: Tickers): Promise<void> {
    if (this.sessionMap.size >= Config.root.sessionLimit) {
      this.logger.info(this.name, `[${bestCandidate.id}]进行中的套利交易数 >= 最大同时交易会话数，不进行套利!!`);
      return;
    }
    this.logger.info(this.name, `进行中的套利交易会话:`, JSON.stringify([...this.sessionMap]));
    if (this.sessionMap.has(bestCandidate.id)) {
      this.logger.info(this.name, `正在执行相同套利:${bestCandidate.id}...`);
      return;
    }

    this.logger.info(this.name, `采用第一名候补者:${bestCandidate.id}, 预期利率:${floorToString(bestCandidate.rate, 4)}%,开始套利...`);
    this.logger.info(this.name, `候补者信息: ${JSON.stringify(bestCandidate)}`);
    const tradeTriangle = await this.getTradeTriangle(bestCandidate);
    if (!tradeTriangle) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (global.pro) {
      this.sessionMap.set(tradeTriangle.id, tradeTriangle);
    }
    await this.strategy.execute(tradeTriangle);
  }

  /**
   * 获得可交易三角组合信息
   *
   * @param triangle
   * @private
   */
  async getTradeTriangle(triangle: Triangle): Promise<TradeTriangle | undefined> {
    const balance = await this.dataService.getBalance();
    const freeAssetList: AssetBalance[] = [];
    for (const assetName of Object.keys(balance)) {
      if (balance[assetName].free > 0) {
        freeAssetList.push({ asset: assetName, ...balance[assetName] });
      }
    }
    if (freeAssetList.length === 0) {
      this.logger.warn(this.name, `未查找到持有资产!!`);
      return;
    }
    const [a, b, c] = triangle.edges;

    // 使用货币
    const useAssetA = a.fromAsset;
    const balanceA = balance[useAssetA];
    if (!balanceA || getBigNumber(balanceA.free).isZero()) {
      this.logger.warn(this.name, `未查找到持有A边(${a.pair})的报价货币(${useAssetA})资产!!`);
      return;
    }

    const pairInfoA = this.getPairInfo(a.pair);
    const pairInfoB = this.getPairInfo(b.pair);
    if (!pairInfoA || !pairInfoB) {
      return;
    }

    const feeA = this.dataService.pairFees[a.pair].taker;
    const minAmountA = getEdgeOrderAmount(a, pairInfoA, feeA);
    this.logger.info(this.name, `${useAssetA}最小交易量: ${minAmountA}`);

    // 可用余额 < 使用货币最小交易量
    if (lt(balanceA.free, minAmountA)) {
      this.logger.info(this.name, `${useAssetA}的可用余额(${balanceA.free}),小于最小交易量(${minAmountA} )！！`);
      return;
    }

    const tradeEdgeA = initTradeEdge(a, minAmountA, feeA);
    let actualTotalA = getActualTotal(tradeEdgeA, feeA);
    const precisionAmountB = pairInfoB.precision.amount;

    const feeB = this.dataService.pairFees[b.pair].taker;

    const feeC = this.dataService.pairFees[c.pair].taker;
    let amountB = floor(divide(actualTotalA, b.price), precisionAmountB).toNumber();
    if (feeB > 0) {
      this.logger.info(this.name, `B边手续费(${feeB}),重新计算A边订单数量。`);
      amountB = ceil(add(amountB, multiple(amountB, feeB), multiple(amountB, 0.1)), precisionAmountB).toNumber();
      const expectFilledAmount = multiple(amountB, b.price);
      tradeEdgeA.quantity = ceil(
        // b边的to如果是基础货币
        getAssetTypeFromPair(b.pair, b.toAsset) === 'base' ? divide(expectFilledAmount, a.price) : expectFilledAmount,
        pairInfoA.precision.amount,
      ).toNumber();
      actualTotalA = getActualTotal(tradeEdgeA, feeA);
      amountB = floor(divide(actualTotalA, b.price), precisionAmountB).toNumber();
    }
    const tradeEdgeB = initTradeEdge(b, amountB, feeB);
    const actualAmountB = floor(getActualTotal(tradeEdgeB, feeB), precisionAmountB).toNumber();

    const tradeEdgeC = initTradeEdge(c, actualAmountB, feeC);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!global.pro) {
      this.logger.info(this.name, `模拟套利成功，测算利率:${floorToString(triangle.rate, 4)}%`);
    }

    return {
      ...triangle,
      openTime: 0,
      status: TradeStatus.Todo,
      edges: [tradeEdgeA, tradeEdgeB, tradeEdgeC],
    };
  }

  private getPairInfo(pairName: string): Market | undefined {
    const pairInfo = this.dataService.getPairInfo(pairName);
    if (!pairInfo) {
      this.logger.warn(this.name, `未查找到(${pairName})的交易对信息!!`);
      return;
    }

    return pairInfo;
  }
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
 * 获得下单成交后的实际数量(成交额)
 *
 * 剩余数量 = 订单数量 - (订单数量 x 手续费)
 * 实际成交额 = '购买' ? 剩余数量 : 剩余数量 x 订单价格
 * @param edge
 * @param fee
 */
function getActualTotal(edge: TradeEdge, fee: number): number {
  // 剩余数量 = 订单数量 - (订单数量 x 手续费)
  const remainingAmount = subtract(edge.quantity, multiple(edge.quantity, fee)).toNumber();

  return edge.side === 'buy' ? remainingAmount : multiple(remainingAmount, edge.price).toNumber();
}

/**
 * 通过pair获取指定货币是基础货币还是报价货币
 * @param pair
 * @param asset
 */
function getAssetTypeFromPair(pair: string, asset: string): 'quote' | 'base' {
  const [baseAsset, quoteAsset] = pair.split('/') as [string, string];
  return asset === baseAsset ? 'base' : 'quote';
}
