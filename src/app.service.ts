import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {
  getHello(): string {
    return 'Hello World!';
  }

  onModuleDestroy(): any {
    Logger.log(`The module has been onModuleDestroy.`, 'AppService');
  }

  onModuleInit(): any {
    Logger.log(`The module has been onModuleInit.`);
  }
}
