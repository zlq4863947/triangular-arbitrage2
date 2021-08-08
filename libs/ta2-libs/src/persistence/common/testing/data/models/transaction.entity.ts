import { TransactionEntityCreateParams } from '@dripjs/models';
import { OrderSide, Timestamp } from '@dripjs/types';

// use function to avoid object mutating when insert to db
export function getTransactionDefaultData(): TransactionEntityCreateParams[] {
  return [
    {
      exchange: 'bitmex',
      symbol: 'xbtusd',
      time: Date.now() as Timestamp,
      side: OrderSide.Buy,
      price: '4821',
      amount: '10',
    },
  ];
}
