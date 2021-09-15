import { Inject, Injectable, Logger as NestLogger } from '@nestjs/common';
import { LogCaller } from '@ta2-libs/common';

import { LOG_STRATEGY, MIN_LOG_LEVEL, TAGS_EXCLUDE, TAGS_INCLUDE } from './common/tokens';
import { LogLevels } from './common/types';
import { isAllowedLogLevel } from './common/utils';
import { LogStrategy } from './strategy/log-strategy';

@LogCaller()
@Injectable()
export class Logger extends NestLogger {
  constructor(
    @Inject(LOG_STRATEGY) private readonly strategy: LogStrategy,
    @Inject(MIN_LOG_LEVEL) private readonly minLogLevel: LogLevels,
    @Inject(TAGS_EXCLUDE) private readonly tagsExclude: string[],
    @Inject(TAGS_INCLUDE) private readonly tagsInclude: string[],
  ) {
    super();
  }

  debug(tag: string, ...data: unknown[]): void {
    this.requestLog(LogLevels.Debug, tag, ...data);
  }

  log(tag: string, ...data: unknown[]): void {
    this.requestLog(LogLevels.Log, tag, ...data);
  }

  info(tag: string, ...data: unknown[]): void {
    this.requestLog(LogLevels.Info, tag, ...data);
  }

  warn(tag: string, ...data: unknown[]): void {
    this.requestLog(LogLevels.Warn, tag, ...data);
  }

  error(tag: string, ...data: unknown[]): void {
    this.requestLog(LogLevels.Error, tag, ...data);
  }

  event(tag: string, ...data: unknown[]): void {
    this.requestLog(LogLevels.Event, tag, ...data);
  }

  private requestLog(logLevel: LogLevels, tag: string, ...data: unknown[]): void {
    if (!isAllowedLogLevel(this.minLogLevel, logLevel)) {
      return; // skip
    }

    const tags = tag.split(',');
    for (const excluded of this.tagsExclude) {
      if (tags.includes(excluded)) {
        return; // skip
      }
    }
    for (const included of this.tagsInclude) {
      if (!tags.includes(included)) {
        return; // skip
      }
    }
    this.strategy.log(logLevel, tags, ...data);
  }
}
