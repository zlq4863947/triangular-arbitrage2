import { Injectable, OnModuleInit } from '@nestjs/common';
import { AssetMarkets, BinanceApiService, EventType, ExecutionType, PairFees, Ticker24Hr, Tickers, UserData } from '@ta2-libs/broker-api';
import { UserAsset } from '@ta2-libs/models';
import { Balances, Market, Order } from 'ccxt';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { CatchError } from '../../common/descriptors';
import { DefaultExceptionHandler } from '../../exceptions';

@Injectable()
@CatchError(DefaultExceptionHandler)
export class DataService implements OnModuleInit {
  private rest = this.binanceApi.rest;
  private websocket = this.binanceApi.ws;
  private tickers$ = new Subject<Tickers>();
  private userData$ = new Subject<UserData>();
  private userAssets$ = new Subject<UserAsset[]>();
  private _assetMarkets: AssetMarkets;
  private _pairFees: PairFees;

  customFilled$ = new Subject<Order>();
  tickers: Tickers;
  userAssets: UserAsset[] = [];
  onReady = this.binanceApi.onReady;

  get assetMarkets(): AssetMarkets {
    return this._assetMarkets;
  }

  get pairFees(): PairFees {
    return this._pairFees;
  }

  constructor(private binanceApi: BinanceApiService) {}

  onModuleInit(): void {
    this.onReady.pipe(filter((isReady) => isReady)).subscribe(() => this.init());
  }

  onCustomFilled$(): Observable<Order> {
    return this.customFilled$.asObservable();
  }

  onUserAssets$(): Observable<UserAsset[]> {
    return this.userAssets$.asObservable();
  }

  onOrderFilled$(): Observable<UserData> {
    return this.userData$
      .asObservable()
      .pipe(filter((data) => data.eventType === EventType.ExecutionReport && data.orderStatus === ExecutionType.FILLED));
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

  private async init(): Promise<void> {
    this._assetMarkets = this.rest.assetMarkets;
    this._pairFees = this.rest.pairFees;
    await this.initUserAssets();
    this.websocket.getAllTickers$().subscribe((tickers) => {
      this.tickers$.next(tickers);
      this.tickers = tickers;
    });
    this.websocket.getUserData$().subscribe((userData) => {
      if (userData.eventType === EventType.OutboundAccountPosition) {
        for (const balance of userData.balances) {
          const useAsset = this.userAssets.find((o) => o.asset === balance.asset);
          if (useAsset) {
            useAsset.free = balance.availableBalance;
            useAsset.locked = balance.onOrderBalance;
          } else {
            this.userAssets.push({
              asset: balance.asset,
              free: balance.availableBalance,
              locked: balance.onOrderBalance,
            });
          }
        }
        this.userAssets$.next(this.userAssets);
      }

      return this.userData$.next(userData);
    });
  }

  private async initUserAssets(): Promise<void> {
    const balance = await this.rest.getBalance();
    if (balance && balance.info && balance.info.balances) {
      this.userAssets = balance.info.balances
        .filter((o) => +o.free > 0 || +o.locked > 0)
        .map((balance) => ({
          asset: balance.asset,
          free: balance.free,
          locked: balance.locked,
        }));
    }
  }
}
