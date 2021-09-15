import { Module } from '@nestjs/common';

import { OnDestroyService } from './on-destroy';

@Module({
  imports: [OnDestroyService],
  exports: [OnDestroyService],
})
export class SharedModule {}
