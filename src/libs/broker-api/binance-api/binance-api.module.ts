import { Module } from '@nestjs/common';

import { BinanceApiService } from './binance-api.service';
import { BinanceWebsocketClientModule } from './binance-websocket-client/binance-websocket-client.module';

// import { WebsocketHandlerService } from './websocket-handler/websocket-handler.service';

@Module({
  providers: [BinanceApiService /*, WebsocketHandlerService*/],
  exports: [BinanceApiService],
  imports: [BinanceWebsocketClientModule],
})
export class BinanceApiModule {}
