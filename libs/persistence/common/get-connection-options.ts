import { Config } from '@ta2-libs/config';
import { ConnectionOptions } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

import { allEntityTypes } from './constants';

export function getConnectionOptions(): ConnectionOptions {
  return {
    ...Config.connectionOptions,
    entities: allEntityTypes,
  } as MysqlConnectionOptions;
}
