import { Logger } from '@arbitrage-libs/logger';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { BinanceRestClient } from '../binance-rest-client/binance-rest-client.service';
import { BinanceWebsocketClient } from '../binance-websocket-client/binance-websocket-client.service';

@Injectable()
export class BinanceApiService implements OnModuleInit {
  constructor(private logger: Logger, public ws: BinanceWebsocketClient, public rest: BinanceRestClient) {}

  async onModuleInit(): Promise<void> {
    this.logger.log('BinanceApiService', `The module has been onModuleInit.`);
    await this.rest.initialize();
    this.ws.initialize(this.rest.getListenKeyRest());
  }
}
