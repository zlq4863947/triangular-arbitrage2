import { ConnectionOptions } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export interface ConfigSettings {
  active: 'binance';
  orderTimes: number;
  processingOrderPatrolTime: number;
  sessionLimit: number;
  broker: {
    [broker: string]: ConfigBroker;
  };
  pro: ConfigPro;
  mysql: ConfigMysql;
  connectionOptions: MysqlConnectionOptions;
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

export interface ConfigMysql {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  logging: boolean;
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
  connectionOptions: {
    ...root.mysql,
    type: 'mysql',
    name: 'default',
    dropSchema: false,
    synchronize: false,
    migrationsRun: false,
    supportBigNumbers: true,
    bigNumberStrings: true,
  },
};

export { Config };
