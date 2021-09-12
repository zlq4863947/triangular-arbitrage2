import { NestFactory } from '@nestjs/core';
import { Logger } from '@ta2-libs/logger';

import { AppModule, AppService } from './app';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      logger: Logger;
      pro: boolean;
    }
  }
}

async function bootstrap() {
  try {
    const app = await NestFactory.createApplicationContext(AppModule);
    const logger = app.get(Logger);
    app.useLogger(logger);
    global.logger = logger;
    global.pro = false;

    const appService = app.get(AppService);
    appService.start(true);
  } catch (e) {
    printError('bootstrapException', e);
  }
}
bootstrap();

process.on('uncaughtException', async (err) => printError('uncaughtException', err));

function printError(label: string, error: Error) {
  const logger = global.logger ? global.logger : console;
  logger.error(label, error);
}
