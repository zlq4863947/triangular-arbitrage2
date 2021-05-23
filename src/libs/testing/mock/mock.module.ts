import { Global, Module } from '@nestjs/common';

/* mock services */
import { provideMockServices } from './mock.service';

@Global()
@Module({
  exports: [...provideMockServices()],
  providers: [...provideMockServices()],
})
export class MockModule {}
