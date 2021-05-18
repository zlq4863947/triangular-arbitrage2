import { BrokerApiModule } from '@arbitrage-libs/broker-api';
import { LogLevels, LoggerModule, MultiLogStrategy } from '@arbitrage-libs/logger';
import { Module } from '@nestjs/common';

import { AppService } from './app.service';

@Module({
  imports: [
    BrokerApiModule,
    LoggerModule.forRoot({
      enableColors: true,
      minLogLevel: LogLevels.Debug,
      strategy: MultiLogStrategy,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
