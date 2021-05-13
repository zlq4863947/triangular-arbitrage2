import { Logger } from '@arbitrage-libs/logger';
import { NestFactory } from '@nestjs/core';

import { AppModule, AppService } from './app';

let appLogger: Logger | null = null;
async function bootstrap() {
  try {
    const app = await NestFactory.createApplicationContext(AppModule);
    const logger = app.get(Logger);
    app.useLogger(logger);
    logger.log(`start service`, 'bootstrap');
    appLogger = logger;
    const appService = app.get(AppService);
    appService.getHello();
    await app.close();
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
