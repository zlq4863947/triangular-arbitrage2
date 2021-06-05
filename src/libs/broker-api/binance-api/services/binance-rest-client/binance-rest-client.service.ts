import { Config } from '@arbitrage-libs/config';
import { Injectable } from '@nestjs/common';
import * as ccxt from 'ccxt';
import { Balances, Market, Order } from 'ccxt';

import { AssetMarkets, OrderParams, Pairs } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const binance = require('binance');

@Injectable()
export class BinanceRestClient {
  public pairs: Pairs;
  public assetMarkets: AssetMarkets;
  private _listenKeyRest: any;
  private ccxt: ccxt.binance;

  async initialize(): Promise<void> {
    this._listenKeyRest = new binance.BinanceRest({
      key: Config.credential.apiKey,
      secret: Config.credential.secret,
      timeout: 15000,
      recvWindow: 10000,
      disableBeautification: false,
      handleDrift: false,
    });
    this.ccxt = new ccxt.binance(Config.credential);
    this.pairs = await this.getPairs();
    await this.initAssetMarkets(Object.keys(this.pairs));
  }

  getListenKeyRest(): any {
    return this._listenKeyRest;
  }

  getBalance(): Promise<Balances> {
    return this.ccxt.fetchBalance();
  }

  getPairInfo(pairName: string): Market | undefined {
    return this.pairs[pairName];
  }

  createOrder(params: OrderParams): Promise<Order | undefined> {
    return this.ccxt.createOrder(params.symbol, params.type, params.side, params.amount, params.price);
  }

  private async getPairs(): Promise<Pairs> {
    return this.ccxt.loadMarkets();
  }

  private initAssetMarkets(pairNames: string[]): void {
    this.assetMarkets = {};
    for (const pairName of pairNames) {
      const assetName = pairName.substr(pairName.indexOf('/') + 1);
      if (assetName) {
        const market = this.pairs[pairName];
        if (!this.assetMarkets[assetName]) {
          this.assetMarkets[assetName] = [market];
        } else {
          this.assetMarkets[assetName].push(market);
        }
      }
    }
  }
}
