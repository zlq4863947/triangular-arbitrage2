import { MasterExchangeEntityCreateParams } from '@dripjs/models';
import { ExchangeType } from '@dripjs/types';

// use function to avoid object mutating when insert to db
export function getExchangeDefaultData(): MasterExchangeEntityCreateParams[] {
  return [
    {
      name: 'bitmex',
      type: ExchangeType.Crypto,
    },
  ];
}
