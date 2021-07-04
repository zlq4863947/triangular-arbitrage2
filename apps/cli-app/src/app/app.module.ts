import { Module } from '@nestjs/common';
import { BrokerApiModule } from '@ta2-libs/broker-api';
import { LogLevels, LoggerModule, MultiLogStrategy } from '@ta2-libs/logger';
import { DataModule, EngineModule, SharedModule, TradeModule } from '@ta2-libs/modules';

import { AppService } from './app.service';
import { StrategyModule } from './strategy';

@Module({
  imports: [
    BrokerApiModule,
    DataModule,
    StrategyModule,
    EngineModule,
    TradeModule,
    LoggerModule.forRoot({
      enableColors: true,
      minLogLevel: LogLevels.Debug,
      strategy: MultiLogStrategy,
    }),
    SharedModule,
  ],
  providers: [AppService],
})
export class AppModule {}
