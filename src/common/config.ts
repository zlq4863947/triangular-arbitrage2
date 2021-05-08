export interface ConfigSettings {
  mode: 'real' | 'test';
  active: 'binance';
  minAmount: number;
  sessionLimit: number;
  brokers: {
    [broker: string]: ConfigBroker;
  };
}

export enum SupportBroker {
  Binance = 'binance',
}

export interface ConfigBroker extends ConfigAPIKey {
  fee: number;
  startAssets: string;
  whitelist: string[];
  blacklist: string[];
}

export interface ConfigAPIKey {
  apiKey: string;
  secret: string;
}

// tslint:disable-next-line:no-var-requires
const Config: ConfigSettings = require('config');

export { Config };
