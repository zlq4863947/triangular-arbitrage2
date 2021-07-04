import { Observable } from 'rxjs';

import { TradeTriangle } from '../trade';

export interface TradingStrategy {
  execute(triangle: TradeTriangle): Promise<void>;
  getResult$(): Observable<TradeTriangle>;
}

export class NoopTradingStrategy implements TradingStrategy {
  execute(): Promise<void> {
    return;
  }

  getResult$(): Observable<TradeTriangle> {
    return;
  }
}
