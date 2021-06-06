import { TradeFee } from '@arbitrage-libs/broker-api';
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

export interface PairFees {
  [pair: string]: TradeFee;
}
