import { CandlestickEntityCreateParams } from '@dripjs/models';
import { Timestamp } from '@dripjs/types';

// use function to avoid object mutating when insert to db
export function getCandlestickDefaultData(): CandlestickEntityCreateParams[] {
  return [
    {
      exchange: 'bitmex',
      symbol: 'xbtusd',
      time: Date.now() as Timestamp,
      period: '5',
      open: '4800',
      close: '4821',
      low: '4800',
      high: '4832',
      volume: '10',
    },
  ];
}
