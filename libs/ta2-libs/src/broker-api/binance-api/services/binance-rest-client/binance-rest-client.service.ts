import { Injectable } from '@nestjs/common';
import { CatchError } from '@ta2-libs/common';
import { Config } from '@ta2-libs/config';
import { DefaultExceptionHandler } from '@ta2-libs/exceptions';
import * as ccxt from 'ccxt';
import { Balances, Market, Order } from 'ccxt';

import { AssetMarkets, OrderParams, PairFees, Pairs } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const binance = require('binance');

@Injectable()
@CatchError(DefaultExceptionHandler)
export class BinanceRestClient {
  public pairs: Pairs;
  public pairFees: PairFees;
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
    this.pairFees = await this.fetchTradingFees();
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

  fetchOrder(orderId: string, symbol: string): Promise<Order | undefined> {
    return this.ccxt.fetchOrder(orderId, symbol);
  }

  createOrder(params: OrderParams): Promise<Order | undefined> {
    return this.ccxt.createOrder(params.symbol, params.type, params.side, params.amount, params.price, {
      newClientOrderId: params.newClientOrderId,
    });
  }

  editOrder(id: string, params: OrderParams): Promise<Order | undefined> {
    return this.ccxt.editOrder(id, params.symbol, params.type, params.side, params.amount, params.price, {
      newClientOrderId: params.newClientOrderId,
    });
  }

  fetchTradingFees(): Promise<PairFees> {
    return this.ccxt.fetchTradingFees();
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
