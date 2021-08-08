import { OrderbookEntityParams } from '@dripjs/models';
import { Timestamp } from '@dripjs/types';

// use function to avoid object mutating when insert to db
export function getOrderbookDefaultData(): OrderbookEntityParams[] {
  return [
    {
      exchange: 'bitmex',
      symbol: 'xbtusd',
      time: Date.now() as Timestamp,
      data: {
        asks: [
          [3860, 847930],
          [3859.5, 1057318],
        ],
        bids: [
          [3859, 727336],
          [3858.5, 59311],
        ],
      },
    },
  ];
}
