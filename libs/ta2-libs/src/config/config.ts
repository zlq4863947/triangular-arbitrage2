export interface ConfigSettings {
  active: 'binance';
  orderTimes: number;
  processingOrderPatrolTime: number;
  sessionLimit: number;
  broker: {
    [broker: string]: ConfigBroker;
  };
  pro: ConfigPro;
}

export interface ConfigPro {
  strategy: string;
}

export interface ConfigBroker {
  profitRate: number;
  startAssets: string[];
  whitelist: string[];
  blacklist: string[];
  mode: 'real' | 'test';
  real: ConfigAPIKey;
  test: ConfigAPIKey;
}

export interface ConfigAPIKey {
  apiKey: string;
  secret: string;
}

// tslint:disable-next-line:no-var-requires
const root: ConfigSettings = require('config');
const activeBroker = root.broker[root.active];
const credential = activeBroker[activeBroker.mode];
const pro = root.pro;

const Config = {
  root,
  activeBroker,
  credential,
  pro,
};

export { Config };
