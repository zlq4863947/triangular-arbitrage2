import { Logger } from '@arbitrage-libs/logger';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MockLogger implements Partial<Logger> {
  constructor() {}
  debug(...data: any[]) {
    // eslint-disable-next-line no-console
    console.debug(...data);
  }
  log(...data: any[]) {
    // eslint-disable-next-line no-console
    console.log(...data);
  }
  info(...data: any[]) {
    // eslint-disable-next-line no-console
    console.info(...data);
  }
  warn(...data: any[]) {
    // eslint-disable-next-line no-console
    console.warn(...data);
  }
  error(...data: any[]) {
    // eslint-disable-next-line no-console
    console.error(...data);
  }
}

// for storybook
export function provideMockServices() {
  return [{ provide: Logger, useClass: MockLogger }];
}
