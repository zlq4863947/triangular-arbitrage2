import { BinanceApiService } from '@arbitrage-libs/broker-api';
import { Logger } from '@arbitrage-libs/logger';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { EngineService } from './modules';

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {
  constructor(private logger: Logger, private binanceApi: BinanceApiService, private engineService: EngineService) {}

  start(): void {
    this.logger.log('AppService', `启动三角套利机器人...`);

    this.engineService.getCandidates$().subscribe((triangles) => {
      console.log('triangles:', triangles);
    });
  }

  onModuleDestroy(): void {
    this.logger.log('AppService', `The module has been onModuleDestroy.`);
  }

  onModuleInit(): void {
    this.logger.info('AppService', `The module has been onModuleInit.`);
  }
}
