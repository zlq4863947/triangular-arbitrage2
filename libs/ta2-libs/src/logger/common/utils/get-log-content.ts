import moment = require('moment');

import { LogLevels } from '../types';
import { makeColoredLogArgs } from './make-colored-log-args';

export function getLogContent(enableColors: boolean, logLevel: LogLevels, tags: string[], ...data: unknown[]): string[] {
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
  const tagStr = `[${tags.join('][')}]`;
  const dateLabel = `   - ${moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ')}   `;
  if (enableColors) {
    logArgs = makeColoredLogArgs(logLevel, levelSpace, tagStr, dateLabel, ...data);
  } else {
    logArgs = [`[${logLevel}${levelSpace}]${tagStr} `, dateLabel, ...data];
  }

  return logArgs;
}
