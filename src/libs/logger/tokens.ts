import { InjectionToken } from './injection-token';
import { LogStrategy } from './log-strategy';
import { LogLevels } from './types';

export const LOG_STRATEGY = new InjectionToken<LogStrategy>('LOG_STRATEGY');
export const ENABLE_COLORS = new InjectionToken<boolean>('ENABLE_COLORS');
export const MIN_LOG_LEVEL = new InjectionToken<LogLevels>('MIN_LOG_LEVEL');
export const TAGS_EXCLUDE = new InjectionToken<string[]>('TAGS_EXCLUDE');
export const TAGS_INCLUDE = new InjectionToken<string[]>('TAGS_INCLUDE');
