import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';

const nodeEnv = process.env.NODE_ENV || 'prod';
const envPath = !process.env.NODE_ENV ? `${__dirname}/config/.env.${nodeEnv}` : `${__dirname}/../config/.env.${nodeEnv}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envPath,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
