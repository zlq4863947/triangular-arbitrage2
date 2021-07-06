import { LogLevels } from '../common';

export interface LogStrategy {
  log(logLevel: LogLevels, tag: string, ...data: unknown[]): void;
}

export class NoopLogStrategy implements LogStrategy {
  log() {}
}
