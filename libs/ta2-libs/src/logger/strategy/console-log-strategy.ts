import { Inject, Injectable } from '@nestjs/common';

import { ENABLE_COLORS, LogLevels, getLogContent } from '../common';
import { LogStrategy } from '../strategy';

@Injectable()
export class ConsoleLogStrategy implements LogStrategy {
  constructor(@Inject(ENABLE_COLORS) private readonly enableColors: boolean) {}
  log(logLevel: LogLevels, tags: string[], ...data: unknown[]): void {
    const logArgs = getLogContent(this.enableColors, logLevel, tags, ...data);

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
