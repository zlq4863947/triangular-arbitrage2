import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Ticker24Hr } from '../..//types';
import { WsEndpoints } from '../constants';
import { WebsocketHandler } from './websocket-handler.service';

@Injectable()
export class BinanceWebsocketClient {
  constructor(private websocketHandler: WebsocketHandler) {}

  initialize(): void {
    this.websocketHandler.initialize();
  }

  getAllTickers$(): Observable<Ticker24Hr[]> {
    return this.websocketHandler.subscribe<Ticker24Hr[]>(WsEndpoints.AllTickers);
  }

  disposeAllTickers(): void {
    return this.websocketHandler.unsubscribe(WsEndpoints.AllTickers);
  }

  disposeAllSubscriptions(): void {
    return this.websocketHandler.unsubscribeAll();
  }
}
