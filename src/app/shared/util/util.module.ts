import { Module } from '@nestjs/common';

import { OnDestroyService } from './on-destroy';

@Module({
  providers: [OnDestroyService],
  exports: [OnDestroyService],
})
export class UtilModule {}
