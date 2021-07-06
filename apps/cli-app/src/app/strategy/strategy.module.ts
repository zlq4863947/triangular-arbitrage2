import { Global, Module } from '@nestjs/common';
import { Strategy, TRADING_STRATEGY } from '@ta2-libs/models';

import { StrategyService } from './strategy.service';

@Global()
@Module({
  providers: [
    {
      provide: TRADING_STRATEGY as any,
      useClass: StrategyService,
    },
    Strategy,
  ],
  exports: [Strategy],
})
export class StrategyModule {}
