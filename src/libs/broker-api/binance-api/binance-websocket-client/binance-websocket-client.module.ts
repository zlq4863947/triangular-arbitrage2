import { Module } from '@nestjs/common';

import { BinanceWebsocketClient } from './services/binance-websocket-client.service';

@Module({
  providers: [BinanceWebsocketClient],
})
export class BinanceWebsocketClientModule {}
