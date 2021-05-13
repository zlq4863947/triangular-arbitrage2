import * as chalk from 'chalk';

import { LogLevelColors, LogLevels, dataColor, tagColor } from './types';

export function isAllowedLogLevel(minLogLevel: LogLevels, target: LogLevels): boolean {
  const logLevelStrength: Record<LogLevels, number> = {
    Debug: 1,
    Log: 2,
    Info: 3,
    Warn: 4,
    Error: 5,
  };
  return logLevelStrength[target] >= logLevelStrength[minLogLevel];
}

function colorLevel(logLevel: LogLevels, levelSpace: string): string {
  return `${chalk.whiteBright.bgHex(LogLevelColors[logLevel]).bold(`  ${logLevel}${levelSpace} `)}${chalk
    .hex(LogLevelColors[logLevel])
    .bgBlack('')}`;
}

export function makeColoredLogArgs(logLevel: LogLevels, levelSpace: string, tag: string, dateLabel: string, ...data: unknown[]): unknown[] {
  const loggerColorSettings: Record<LogLevels, string> = {
    Debug: colorLevel(LogLevels.Debug, levelSpace),
    Log: colorLevel(LogLevels.Log, levelSpace),
    Info: colorLevel(LogLevels.Info, levelSpace),
    Warn: colorLevel(LogLevels.Warn, levelSpace),
    Error: colorLevel(LogLevels.Error, levelSpace),
  };

  return [loggerColorSettings[logLevel], dateLabel, chalk.hex(tagColor).bold(`[${tag}] `), chalk.hex(dataColor).bold(...data)];
}
