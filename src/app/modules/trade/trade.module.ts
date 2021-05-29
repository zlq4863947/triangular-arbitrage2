import { Module } from '@nestjs/common';

import { TradeService } from './trade.service';

@Module({
  providers: [TradeService],
  exports: [TradeService],
})
export class TradeModule {}
