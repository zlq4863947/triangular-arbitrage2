import { Module } from '@nestjs/common';

/* mock services */
import { provideMockServices } from './mock.service';

@Module({
  providers: [...provideMockServices()],
})
export class MockModule {}
