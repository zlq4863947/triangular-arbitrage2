import { Module } from '@nestjs/common';

import { BinanceApiModule } from './binance-api';

@Module({
  imports: [BinanceApiModule],
  exports: [BinanceApiModule],
})
export class BrokerApiModule {}
