import { BinanceApiService } from '@arbitrage-libs/broker-api';
import { Logger } from '@arbitrage-libs/logger';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { EngineService } from './modules';
import { OnDestroyService } from './shared';

import moment = require('moment');
const AsciiTable = require('ascii-table');

@Injectable()
export class AppService extends OnDestroyService implements OnModuleInit {
  constructor(private logger: Logger, private binanceApi: BinanceApiService, private engineService: EngineService) {
    super();
  }

  start(): void {
    this.logger.log('AppService', `启动三角套利机器人...`);
    const table = new AsciiTable('三角套利候选列表');

    this.engineService.getCandidates$().subscribe((triangles) => {
      table.setHeading('', '路径', '利率', '产生时间');
      for (const [index, triangle] of triangles.entries()) {
        table.addRow(index + 1, triangle.id, triangle.rate, moment(triangle.time).format('YYYY-MM-DDTHH:mm:ss.SSSZZ'));
      }
      console.log(table.toString());
      table.clear();
    });
  }

  onModuleInit(): void {
    this.logger.info('AppService', `The module has been onModuleInit.`);
  }
}
