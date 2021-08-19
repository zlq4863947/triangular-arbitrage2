import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { TradeTriangle } from '../../models';
import { TRADING_STRATEGY } from './tokens';
import { TradingStrategy } from './trading-strategy';

@Injectable()
export class Strategy {
  constructor(@Inject(TRADING_STRATEGY) private readonly tradingStrategy: TradingStrategy) {}

  execute(triangle: TradeTriangle): Promise<void> {
    return this.tradingStrategy.execute(triangle);
  }

  getResult$(): Observable<string> {
    return this.tradingStrategy.getResult$();
  }
}
