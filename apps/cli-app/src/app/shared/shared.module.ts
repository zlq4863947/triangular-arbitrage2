import { Module } from '@nestjs/common';

import { UtilModule } from './util';

@Module({
  imports: [UtilModule],
  exports: [UtilModule],
})
export class SharedModule {}
