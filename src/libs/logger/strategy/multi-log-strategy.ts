import { Inject, Injectable } from '@nestjs/common';
import { Logger, configure, getLogger } from 'log4js';

import { ENABLE_COLORS } from '../tokens';
import { LogLevels } from '../types';
import { LogStrategy } from './log-strategy';
import { getLogContent } from './utils';

export enum LogCategory {
  App = 'app',
  Debug = 'debug',
  Error = 'error',
}

const defaultAppender = {
  type: 'multiFile',
  pattern: '.yyyyMMdd-hh',
  maxLogSize: 1024 * 1024 * 50,
  backups: 300,
  compress: true,
  keepFileExt: true,
  layout: {
    type: 'messagePassThrough',
  },
};

@Injectable()
export class MultiLogStrategy implements LogStrategy {
  private loggerMap: Map<LogCategory, Logger> = new Map();

  constructor(@Inject(ENABLE_COLORS) private readonly enableColors: boolean) {
    configure({
      appenders: {
        multi: { ...defaultAppender, base: 'logs/', property: 'categoryName', extension: '.log' },
        console: { type: 'console', layout: { type: 'messagePassThrough' } },
      },
      categories: {
        default: { appenders: ['multi'], level: 'ALL' },
        console: { appenders: ['console'], level: 'ALL' },
      },
    });

    this.loggerMap.set(LogCategory.App, getLogger(LogCategory.App));
    this.loggerMap.set(LogCategory.Debug, getLogger(LogCategory.Debug));
    this.loggerMap.set(LogCategory.Error, getLogger(LogCategory.Error));
  }

  log(logLevel: LogLevels, tag: string, ...data: unknown[]) {
    const colorMessage = getLogContent(this.enableColors, logLevel, tag, ...data).join('');
    const message = getLogContent(false, logLevel, tag, ...data).join('');
    switch (logLevel) {
      case LogLevels.Warn:
      case LogLevels.Debug: {
        this.loggerMap.get(LogCategory.Debug).debug(message);
        getLogger('console').info(colorMessage);
        return;
      }
      case LogLevels.Log:
      case LogLevels.Info: {
        this.loggerMap.get(LogCategory.App).info(message);
        getLogger('console').info(colorMessage);
        return;
      }
      case LogLevels.Error: {
        this.loggerMap.get(LogCategory.Error).error(message);
        getLogger('console').info(colorMessage);
        return;
      }
    }
  }
}
