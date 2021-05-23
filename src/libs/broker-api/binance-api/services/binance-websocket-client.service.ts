import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { WsEndpoints, WsMarketEndpoints } from '../constants';
import { ExecutionReport, Ticker24Hr } from '../types';
import { WebsocketHandler } from './websocket-handler.service';

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

  getExecutionReport$(rest: any): Observable<ExecutionReport> {
    return this.websocketHandler.subscribeUserData<ExecutionReport>(WsEndpoints.ExecutionReport, rest);
  }

  disposeExecutionReport(): void {
    return this.websocketHandler.unsubscribe(WsEndpoints.ExecutionReport);
  }

  disposeAllSubscriptions(): void {
    return this.websocketHandler.unsubscribeAll();
  }
}
