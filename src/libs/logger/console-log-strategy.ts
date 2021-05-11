import { Inject, Injectable } from '@nestjs/common';

import { LogStrategy } from './log-strategy';
import { ENABLE_COLORS } from './tokens';
import { LogLevels } from './types';
import { makeColoredLogArgs } from './utils';
import moment = require('moment');

@Injectable()
export class ConsoleLogStrategy implements LogStrategy {
  constructor(@Inject(ENABLE_COLORS) private readonly enableColors: boolean) {}
  log(logLevel: LogLevels, tag: string, ...data: unknown[]) {
    debugger;
    let logArgs: unknown[];
    const dateLabel = `   - ${moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ')}   `;
    if (this.enableColors) {
      logArgs = makeColoredLogArgs(logLevel, tag, dateLabel, ...data);
    } else {
      logArgs = [`[${tag}]`, dateLabel, ...data];
    }

    switch (logLevel) {
      case LogLevels.Debug: {
        // eslint-disable-next-line no-console
        console.debug(...logArgs);
        return;
      }
      case LogLevels.Log: {
        console.log(...logArgs);
        return;
      }
      case LogLevels.Info: {
        console.info(...logArgs);
        return;
      }
      case LogLevels.Warn: {
        // eslint-disable-next-line no-console
        console.warn(...logArgs);
        return;
      }
      case LogLevels.Error: {
        console.error(...logArgs);
        return;
      }
    }
  }
}
