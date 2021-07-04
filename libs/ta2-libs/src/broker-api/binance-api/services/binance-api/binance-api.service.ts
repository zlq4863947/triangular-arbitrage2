import { Injectable, OnModuleInit } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';

import { BinanceRestClient } from '../binance-rest-client/binance-rest-client.service';
import { BinanceWebsocketClient } from '../binance-websocket-client/binance-websocket-client.service';

@Injectable()
export class BinanceApiService implements OnModuleInit {
  onReady = new BehaviorSubject(false);
  constructor(public ws: BinanceWebsocketClient, public rest: BinanceRestClient) {}

  async onModuleInit(): Promise<void> {
    await this.rest.initialize();
    this.ws.initialize(this.rest.getListenKeyRest());
    this.onReady.next(true);
  }
}
