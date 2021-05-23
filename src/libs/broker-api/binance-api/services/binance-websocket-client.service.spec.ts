import { Config } from '@arbitrage-libs/config';
import { provideMockServices } from '@arbitrage-libs/testing';
import { Test, TestingModule } from '@nestjs/testing';

import { BinanceWebsocketClient } from './binance-websocket-client.service';
import { WebsocketHandler } from './websocket-handler.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const binance = require('binance');

describe('BinanceWebsocketClientService', () => {
  let service: BinanceWebsocketClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [...provideMockServices(), WebsocketHandler, BinanceWebsocketClient],
    }).compile();

    service = module.get<BinanceWebsocketClient>(BinanceWebsocketClient);
    service.initialize();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get getAllTickers$', (done) => {
    service.getAllTickers$().subscribe((data) => {
      expect(data.length > 0).toBeTruthy();
      done();
    });
  });

  it('should get getUserData$', (done) => {
    const rest = new binance.BinanceRest({
      key: Config.credential.apiKey,
      secret: Config.credential.secret,
      timeout: 15000,
      recvWindow: 10000,
      disableBeautification: false,
      handleDrift: false,
    });

    service.getExecutionReport$(rest).subscribe((data) => {
      expect(data).toBeDefined();
      done();
    });
  });
});
