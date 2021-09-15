import { Global, Module } from '@nestjs/common';

import { BinanceApiModule } from './binance-api';

@Global()
@Module({
  imports: [BinanceApiModule],
  exports: [BinanceApiModule],
})
export class BrokerApiModule {}
