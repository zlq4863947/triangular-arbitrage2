import { Module } from '@nestjs/common';

import { StrategyModule } from '../../core/strategy';
import { TradeService } from './trade.service';

@Module({
  imports: [StrategyModule.forRoot()],
  providers: [TradeService],
  exports: [TradeService],
})
export class TradeModule {}
