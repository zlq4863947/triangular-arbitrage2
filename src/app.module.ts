import { Module } from '@nestjs/common';

import { AppService } from './app.service';

@Module({
  imports: [],
  providers: [AppService],
})
export class AppModule {}
