import { Market } from 'ccxt';

export interface Pairs {
  [pair: string]: Market;
}

export interface AssetMarkets {
  [asset: string]: Market[];
}

export interface AssetMarket {
  [asset: string]: Market;
}
