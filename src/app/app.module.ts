import { LoggerModule } from '@arbitrage-libs/logger';
import { Module } from '@nestjs/common';

import { AppService } from './app.service';

@Module({
  imports: [
    LoggerModule.forRoot({
      enableColors: true,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
