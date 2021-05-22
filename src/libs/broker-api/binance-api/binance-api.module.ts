import { Module } from '@nestjs/common';

import { BinanceWebsocketClient, WebsocketHandler } from './services';

@Module({
  exports: [BinanceWebsocketClient],
  providers: [WebsocketHandler, BinanceWebsocketClient],
})
export class BinanceApiModule {}
