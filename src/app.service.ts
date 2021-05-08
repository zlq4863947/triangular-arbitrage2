import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    console.log(`aaa: ${this.configService.get('MYSQL_PASSWORD')}`);
    return 'Hello World!';
  }

  onModuleDestroy(): any {
    console.log(`The module has been onModuleDestroy.`);
  }

  onModuleInit(): any {
    console.log(`The module has been onModuleInit.`);
  }
}
