import { Logger } from '@arbitrage-libs/logger';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });
  const logger = app.get(Logger);
  app.useLogger(logger);
  logger.log(`start service`, 'bootstrap');
  // const appService = app.get(AppService);
  // appService.getHello();
  await app.close();
}
bootstrap();
