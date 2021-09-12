import { Injectable } from '@nestjs/common';
import { CatchError, floorToString } from '@ta2-libs/common';
import { DefaultExceptionHandler } from '@ta2-libs/exceptions';
import { Logger } from '@ta2-libs/logger';
import { Triangle } from '@ta2-libs/models';
import { DataService, EngineService, OnDestroyService, TradeService } from '@ta2-libs/modules';

import moment = require('moment');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AsciiTable = require('ascii-table');

@Injectable()
@CatchError(DefaultExceptionHandler)
export class AppService extends OnDestroyService {
  private name = 'AppService';

  constructor(
    private logger: Logger,
    private dataService: DataService,
    private engineService: EngineService,
    private tradeService: TradeService,
  ) {
    super();
  }

  start(printTable?: boolean): void {
    this.logger.info(this.name, `启动三角套利机器人...`);
    this.engineService.getTradableTriangle$().subscribe((triangle) => this.tradeService.start(triangle, this.dataService.tickers));
    /*if (printTable) {
      this.engineService.getCandidates$().subscribe(this.printTable);
    }*/
  }

  printTable(triangles: Triangle[]): void {
    const table = new AsciiTable('三角套利候选列表');
    table.setHeading('', '路径', '利率', '产生时间');
    for (const [index, triangle] of triangles.entries()) {
      table.addRow(
        index + 1,
        triangle.id,
        `${floorToString(triangle.rate, 4)}%`,
        moment(triangle.time).format('YYYY-MM-DDTHH:mm:ss.SSSZZ'),
      );
    }
    console.log(table.toString());
    table.clear();
  }
}
