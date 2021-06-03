import { BinanceApiService, Ticker24Hr, Tickers } from '@arbitrage-libs/broker-api';
import { Config } from '@arbitrage-libs/config';
import { Logger } from '@arbitrage-libs/logger';
import { divide, floor, getBigNumber, gt, gte, multiple } from '@arbitrage-libs/util';
import { Injectable } from '@nestjs/common';
import { Balance } from 'ccxt';

import { Edge, Triangle } from '../../models';

interface AssetBalance extends Balance {
  asset: string;
}

@Injectable()
export class TradeService {
  private rest = this.binanceApi.rest;
  constructor(private logger: Logger, private binanceApi: BinanceApiService) {}

  async start(triangles: Triangle[], tickers: Tickers): Promise<void> {
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
    await this.testOrder(bestCandidate);
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
   * 模拟下单
   *
   * @param triangle
   * @private
   */
  private async testOrder(triangle: Triangle): Promise<void> {
    const balance = await this.rest.getBalance();
    const freeAssetList: AssetBalance[] = [];
    for (const assetName of Object.keys(balance)) {
      if (balance[assetName].free > 0) {
        freeAssetList.push({ asset: assetName, ...balance[assetName] });
      }
    }
    if (freeAssetList.length === 0) {
      this.logger.warn('TradeService-testOrder', `未查找到持有资产!!`);
      return;
    }

    this.logger.info('TradeService-testOrder', triangle.rate);
    const [a, b, c] = triangle.edges;

    // 使用货币
    const useAssetA = a.side === 'buy' ? a.fromAsset : a.toAsset;
    const balanceA = balance[useAssetA];
    if (!balanceA || getBigNumber(balanceA.free).isZero()) {
      this.logger.warn('TradeService-testOrder', `未查找到持有A边(${a.pair})的报价货币(${useAssetA})资产!!`);
      return;
    }
    debugger;
  }
}

function checkMinAmount(cEdge: Edge, ticker?: Ticker24Hr): boolean {
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
