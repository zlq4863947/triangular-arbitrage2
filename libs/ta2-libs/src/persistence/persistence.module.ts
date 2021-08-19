import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getConnectionOptions } from './common';

@Global()
@Module({})
export class PersistenceModule {
  static forRoot(): DynamicModule {
    return {
      module: PersistenceModule,
      imports: [TypeOrmModule.forRoot(getConnectionOptions())],
    };
  }
}
