import { Observable } from 'rxjs';

import { TradeTriangle } from '../trade';

export interface TradingStrategy {
  sessionMap: Map<string, TradeTriangle>;
  execute(triangle: TradeTriangle): Promise<void>;
  getResult$(): Observable<TradeTriangle>;
}

export class NoopTradingStrategy implements TradingStrategy {
  sessionMap = new Map<string, TradeTriangle>();

  execute(): Promise<void> {
    return;
  }

  getResult$(): Observable<TradeTriangle> {
    return;
  }
}
