import { Market } from 'ccxt';

export interface Pairs {
  [pair: string]: Market;
}

export interface Markets {
  [asset: string]: Market[];
}
