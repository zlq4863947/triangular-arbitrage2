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

function colorLevel(logLevel: LogLevels): string {
  return `${chalk.whiteBright.bgHex(LogLevelColors[logLevel]).bold(`  ${logLevel} `)}${chalk.hex(LogLevelColors[logLevel]).bgBlack('')}`;
}

export function makeColoredLogArgs(logLevel: LogLevels, tag: string, dateLabel: string, ...data: unknown[]): unknown[] {
  const loggerColorSettings: Record<LogLevels, string> = {
    Debug: colorLevel(LogLevels.Debug),
    Log: colorLevel(LogLevels.Log),
    Info: colorLevel(LogLevels.Info),
    Warn: colorLevel(LogLevels.Warn),
    Error: colorLevel(LogLevels.Error),
  };

  return [loggerColorSettings[logLevel], dateLabel, chalk.hex(tagColor).bold(`[${tag}]`), chalk.hex(dataColor).bold(...data)];
}
