import { Global, Module } from '@nestjs/common';

import { provideMockServices } from './mock.service';

/* mock services */

@Global()
@Module({
  exports: [...provideMockServices()],
  providers: [...provideMockServices()],
})
export class MockModule {}
