import { LogLevels } from '../common';

export interface LogStrategy {
  log(logLevel: LogLevels, tags: string[], ...data: unknown[]): void;
}

export class NoopLogStrategy implements LogStrategy {
  log(): void {}
}
