import { TickerEntityCreateParams } from '@dripjs/models';
import { Timestamp } from '@dripjs/types';

// use function to avoid object mutating when insert to db
export function getTickerDefaultData(): TickerEntityCreateParams[] {
  return [
    {
      exchange: 'bitmex',
      symbol: 'xbtusd',
      time: Date.now() as Timestamp,
      bid: '4820',
      ask: '4821',
      open: '4800',
      last: '4821',
      low: '4800',
      high: '4832',
      volume: '10',
    },
  ];
}
