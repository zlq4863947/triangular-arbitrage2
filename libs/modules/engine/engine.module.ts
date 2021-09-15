import { Module } from '@nestjs/common';

import { EngineService } from './engine.service';

@Module({
  providers: [EngineService],
  exports: [EngineService],
})
export class EngineModule {}
