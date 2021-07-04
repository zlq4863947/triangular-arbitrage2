import { Config } from '@arbitrage-libs/config';
import { MockModule } from '@arbitrage-libs/testing';
import { Test, TestingModule } from '@nestjs/testing';

import { WebsocketHandler } from '../websocket-handler/websocket-handler.service';
import { BinanceWebsocketClient } from './binance-websocket-client.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const binance = require('binance');

describe('BinanceWebsocketClientService', () => {
  let service: BinanceWebsocketClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockModule],
      providers: [WebsocketHandler, BinanceWebsocketClient],
    }).compile();

    service = module.get<BinanceWebsocketClient>(BinanceWebsocketClient);
    service.initialize({} as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get getAllTickers$', (done) => {
    service.getAllTickers$().subscribe((data) => {
      expect(Object.keys(data).length > 0).toBeTruthy();
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

    service.getUserData$(rest).subscribe((data) => {
      expect(data).toBeDefined();
      done();
    });
  });
});
