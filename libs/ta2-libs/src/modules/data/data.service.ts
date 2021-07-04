import { Injectable, OnModuleInit } from '@nestjs/common';
import { AssetMarkets, BinanceApiService, PairFees, Ticker24Hr, Tickers, UserData } from '@ta2-libs/broker-api';
import { Balances, Market, Order } from 'ccxt';
import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { CatchError } from '../../common/descriptors';
import { DefaultExceptionHandler } from '../../exceptions';

@Injectable()
@CatchError(DefaultExceptionHandler)
export class DataService implements OnModuleInit {
  private rest = this.binanceApi.rest;
  private websocket = this.binanceApi.ws;
  private tickers$ = new Subject<Tickers>();
  private _assetMarkets: AssetMarkets;
  private _pairFees: PairFees;

  customFilled$ = new Subject<Order>();
  tickers: Tickers;
  onReady = this.binanceApi.onReady;

  get assetMarkets(): AssetMarkets {
    return this._assetMarkets;
  }

  get pairFees(): PairFees {
    return this._pairFees;
  }

  constructor(private binanceApi: BinanceApiService) {}

  onModuleInit(): void {
    this.onReady
      .pipe(
        filter((isReady) => isReady),
        tap(() => this.init()),
        switchMap(() => this.websocket.getAllTickers$()),
      )
      .subscribe((tickers) => {
        this.tickers$.next(tickers);
        this.tickers = tickers;
      });
  }

  onCustomFilled$(): Observable<Order> {
    return this.customFilled$.asObservable();
  }

  onOrderFilled$(): Observable<UserData> {
    return this.websocket.getUserData$().pipe(filter((data) => data.eventType === 'executionReport' && data.orderStatus === 'FILLED'));
  }

  getTicker$(pair: string): Observable<Ticker24Hr> {
    return this.tickers$.asObservable().pipe(map((tickers) => tickers[pair.toUpperCase()]));
  }

  getTickers$(): Observable<Tickers> {
    return this.tickers$.asObservable();
  }

  getBalance(): Promise<Balances> {
    return this.rest.getBalance();
  }

  getPairInfo(pairName: string): Market | undefined {
    return this.rest.getPairInfo(pairName);
  }

  private init() {
    this._assetMarkets = this.rest.assetMarkets;
    this._pairFees = this.rest.pairFees;
  }
}
