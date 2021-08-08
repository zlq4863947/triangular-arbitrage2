import { MasterPairEntityCreateParams } from '@dripjs/models';

// use function to avoid object mutating when insert to db
export function getPairDefaultData(): MasterPairEntityCreateParams[] {
  return [
    {
      exchange: 'bitmex',
      name: 'xbtusd',
      baseAsset: 'xbt',
      quoteAsset: 'usd',
      amountPrecision: 0,
      pricePrecision: 1,
      maxOrderAmount: 9999999,
      maxOrderPrice: 9999999,
    },
  ];
}
