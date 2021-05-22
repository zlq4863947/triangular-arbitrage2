import { provideMockServices } from '@arbitrage-libs/testing';
import { Test, TestingModule } from '@nestjs/testing';

import { BinanceWebsocketClient } from './binance-websocket-client.service';
import { WebsocketHandler } from './websocket-handler.service';

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

  it('should get defined', (done) => {
    service.getAllTickers$().subscribe((data) => {
      expect(data.length > 0).toBeTruthy();
      done();
    });
  });
});
