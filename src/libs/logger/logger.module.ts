import { DynamicModule, Global, Module, Type } from '@nestjs/common';

import { Logger } from './logger';
import { ConsoleLogStrategy, LogStrategy } from './strategy';
import { ENABLE_COLORS, LOG_STRATEGY, MIN_LOG_LEVEL, TAGS_EXCLUDE, TAGS_INCLUDE } from './tokens';
import { LogLevels } from './types';

interface LoggerConfig {
  strategy?: Type<LogStrategy>;
  minLogLevel?: LogLevels;
  enableColors?: boolean;
  tagsExclude?: string[];
  tagsInclude?: string[];
}

@Global()
@Module({
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule {
  static forRoot(config: LoggerConfig): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: LOG_STRATEGY as any,
          useClass: config.strategy || ConsoleLogStrategy,
        },
        {
          provide: MIN_LOG_LEVEL as any,
          useValue: (config.minLogLevel || LogLevels.Debug) as LogLevels,
        },
        {
          provide: ENABLE_COLORS as any,
          useValue: config.enableColors,
        },
        {
          provide: TAGS_EXCLUDE as any,
          useValue: config.tagsExclude || [],
        },
        {
          provide: TAGS_INCLUDE,
          useValue: config.tagsInclude || [],
        },
        Logger,
      ],
    };
  }
}
