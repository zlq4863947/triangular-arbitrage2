import { Module } from '@nestjs/common';

import { BinanceWebsocketClientService } from './services/binance-websocket-client.service';

@Module({
  providers: [BinanceWebsocketClientService],
})
export class BinanceWebsocketClientModule {}
