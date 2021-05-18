import { BinanceApiService } from '@arbitrage-libs/broker-api';
import { Logger } from '@arbitrage-libs/logger';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {
  constructor(private logger: Logger, private apiService: BinanceApiService) {}

  getHello(): string {
    this.logger.log('AppService', `getHello`);
    this.apiService.getApi();

    return 'Hello World!';
  }

  onModuleDestroy(): any {
    this.logger.log('AppService', `The module has been onModuleDestroy.`);
  }

  onModuleInit(): any {
    this.logger.info('AppService', `The module has been onModuleInit.`);
  }
}
