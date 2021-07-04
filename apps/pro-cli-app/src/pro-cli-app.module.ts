import { Module } from '@nestjs/common';

import { ProCliAppController } from './pro-cli-app.controller';
import { ProCliAppService } from './pro-cli-app.service';

@Module({
  imports: [],
  controllers: [ProCliAppController],
  providers: [ProCliAppService],
})
export class ProCliAppModule {}
