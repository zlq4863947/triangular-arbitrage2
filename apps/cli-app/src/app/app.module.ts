import { Module } from '@nestjs/common';
import { BrokerApiModule } from '@ta2-libs/broker-api';
import { LogLevels, LoggerModule, MultiLogStrategy } from '@ta2-libs/logger';
import { SharedModule } from '@ta2-libs/modules/shared';

import { AppService } from './app.service';

@Module({
  imports: [
    /*EngineModule,
    TradeModule,
    BrokerApiModule,*/
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
