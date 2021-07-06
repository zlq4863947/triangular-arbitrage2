import { Module } from '@nestjs/common';

import { BinanceApiService, BinanceRestClient, BinanceWebsocketClient, WebsocketHandler } from './services';

@Module({
  exports: [BinanceApiService, BinanceWebsocketClient, WebsocketHandler, BinanceRestClient],
  providers: [BinanceApiService, WebsocketHandler, BinanceWebsocketClient, BinanceRestClient],
})
export class BinanceApiModule {}
