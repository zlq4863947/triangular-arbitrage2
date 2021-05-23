import { BinanceApiService } from '@arbitrage-libs/broker-api';
import { Config } from '@arbitrage-libs/config';
import { Logger } from '@arbitrage-libs/logger';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const binance = require('binance');

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {
  constructor(private logger: Logger, private binanceApi: BinanceApiService) {}

  getHello(): string {
    this.logger.log('AppService', `getHello`);
    this.binanceApi.ws.initialize();
    const rest = new binance.BinanceRest({
      key: Config.credential.apiKey,
      secret: Config.credential.secret,
      timeout: 15000,
      recvWindow: 10000,
      disableBeautification: false,
      handleDrift: false,
    });
    /* this.binanceApi.ws.getUserData$(rest).subscribe((data) => {
      this.logger.log('getExecutionReport$:', JSON.stringify(data));
    });
    this.binanceApi.ws.getAllTickers$().subscribe((data) => {
      this.logger.log('getAllTickers$:', JSON.stringify(data));
    });

    setTimeout(() => {
      this.binanceApi.ws.disposeAllTickers();
    }, 3000); */

    this.binanceApi.rest.initialize();
    this.binanceApi.rest.getPairs().then((res) => {
      console.log(res);
    });

    return 'Hello World!';
  }

  onModuleDestroy(): any {
    this.logger.log('AppService', `The module has been onModuleDestroy.`);
  }

  onModuleInit(): any {
    this.logger.info('AppService', `The module has been onModuleInit.`);
  }
}
