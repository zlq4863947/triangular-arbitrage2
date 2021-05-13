import moment = require('moment');

import { LogLevels } from '@arbitrage-libs/logger/types';
import { makeColoredLogArgs } from '@arbitrage-libs/logger/utils';

export function getLogContent(enableColors: boolean, logLevel: LogLevels, tag: string, ...data: unknown[]): string[] {
  let levelSpace = '';
  switch (logLevel) {
    case LogLevels.Log: {
      levelSpace = '  ';
      break;
    }
    case LogLevels.Info:
    case LogLevels.Warn: {
      levelSpace = ' ';
      break;
    }
  }
  let logArgs: any[];
  const dateLabel = `   - ${moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ')}   `;
  if (enableColors) {
    logArgs = makeColoredLogArgs(logLevel, levelSpace, tag, dateLabel, ...data);
  } else {
    logArgs = [`[${logLevel}${levelSpace}][${tag}] `, dateLabel, ...data];
  }

  return logArgs;
}
