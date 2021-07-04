import { NestFactory } from '@nestjs/core';

import { ProCliAppModule } from './pro-cli-app.module';

async function bootstrap() {
  const app = await NestFactory.create(ProCliAppModule);
  await app.listen(3000);
}
bootstrap();
