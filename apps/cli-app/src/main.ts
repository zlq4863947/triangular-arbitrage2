import { NestFactory } from '@nestjs/core';
import { Logger } from '@ta2-libs/logger';

import { AppModule, AppService } from './app';

let appLogger: Logger | null = null;
async function bootstrap() {
  try {
    const app = await NestFactory.createApplicationContext(AppModule);
    const logger = app.get(Logger);
    app.useLogger(logger);
    appLogger = logger;

    const appService = app.get(AppService);
    appService.start();
  } catch (e) {
    printError('bootstrapException', e);
  }
}
bootstrap();

process.on('uncaughtException', async (err) => printError('uncaughtException', err));

function printError(label: string, error: Error) {
  const logger = appLogger ? appLogger : console;
  logger.error(label, error);
}
