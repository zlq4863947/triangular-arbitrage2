import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { WsEndpoints, WsMarketEndpoints } from '../../constants';
import { Ticker24Hr, UserData } from '../../types';
import { WebsocketHandler } from '../websocket-handler/websocket-handler.service';

@Injectable()
export class BinanceWebsocketClient {
  constructor(private websocketHandler: WebsocketHandler) {}

  initialize(): void {
    this.websocketHandler.initialize();
  }

  getAllTickers$(): Observable<Ticker24Hr[]> {
    return this.websocketHandler.subscribe<Ticker24Hr[]>(WsMarketEndpoints.AllTickers);
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
