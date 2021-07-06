import { Injectable } from '@nestjs/common';
import { CatchError } from '@ta2-libs/common';
import { DefaultExceptionHandler } from '@ta2-libs/exceptions';
import { Logger } from '@ta2-libs/logger';
import { TradeStatus, TradeTriangle, TradingStrategy } from '@ta2-libs/models';
import { EMPTY, Observable } from 'rxjs';

@Injectable()
@CatchError(DefaultExceptionHandler)
export class StrategyService implements TradingStrategy {
  private name = 'StrategyService';
  private triangle: TradeTriangle | undefined = undefined;
  constructor(private logger: Logger) {}

  async execute(triangle: TradeTriangle): Promise<void> {
    triangle.status = TradeStatus.Open;
    triangle.openTime = Date.now();
    this.triangle = triangle;
    this.logger.info(this.name, `套利交易信息:${JSON.stringify(triangle)}`);
  }

  getResult$(): Observable<TradeTriangle> {
    return EMPTY;
  }
}
