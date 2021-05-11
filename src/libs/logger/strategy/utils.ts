import moment = require('moment');

import { LogLevels } from '@arbitrage-libs/logger/types';
import { makeColoredLogArgs } from '@arbitrage-libs/logger/utils';

export function getLogContent(enableColors: boolean, logLevel: LogLevels, tag: string, ...data: unknown[]): string[] {
  let logArgs: any[];
  const dateLabel = `   - ${moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ')}   `;
  if (enableColors) {
    logArgs = makeColoredLogArgs(logLevel, tag, dateLabel, ...data);
  } else {
    logArgs = [`[${tag}] `, dateLabel, ...data];
  }

  return logArgs;
}
