import { LogLevels } from '../types';

export function isAllowedLogLevel(minLogLevel: LogLevels, target: LogLevels): boolean {
  const logLevelStrength: Record<LogLevels, number> = {
    Debug: 1,
    Log: 2,
    Info: 3,
    Event: 4,
    Warn: 5,
    Error: 6,
  };
  return logLevelStrength[target] >= logLevelStrength[minLogLevel];
}
