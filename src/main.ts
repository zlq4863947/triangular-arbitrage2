import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  Logger.log(`start service`, 'bootstrap');
  const appService = app.get(AppService);
  appService.getHello();
  await app.close();
}
bootstrap();
