import { Market } from 'ccxt';

import { TradeFee } from './order';

export interface Pairs {
  [pair: string]: Market;
}

export interface AssetMarkets {
  [asset: string]: Market[];
}

export interface AssetMarket {
  [asset: string]: Market;
}

export interface PairFees {
  [pair: string]: TradeFee;
}
