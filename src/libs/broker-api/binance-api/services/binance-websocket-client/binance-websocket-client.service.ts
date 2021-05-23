import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WsEndpoints, WsMarketEndpoints } from '../../constants';
import { Ticker24Hr, Tickers, UserData } from '../../types';
import { WebsocketHandler } from '../websocket-handler/websocket-handler.service';

@Injectable()
export class BinanceWebsocketClient {
  constructor(private websocketHandler: WebsocketHandler) {}

  initialize(): void {
    this.websocketHandler.initialize();
  }

  getAllTickers$(): Observable<Tickers> {
    return this.websocketHandler.subscribe<Ticker24Hr[]>(WsMarketEndpoints.AllTickers).pipe(
      map((oTickers) => {
        const tickers: Tickers = {};
        oTickers.forEach((o) => (tickers[o.symbol] = o));
        return tickers;
      }),
    );
  }

  disposeAllTickers(): void {
    return this.websocketHandler.unsubscribe(WsMarketEndpoints.AllTickers);
  }

  getUserData$(rest: any): Observable<UserData> {
    return this.websocketHandler.subscribeUserData<UserData>(WsEndpoints.UserData, rest);
  }

  disposeExecutionReport(): void {
    return this.websocketHandler.unsubscribe(WsEndpoints.UserData);
  }

  disposeAllSubscriptions(): void {
    return this.websocketHandler.unsubscribeAll();
  }
}
