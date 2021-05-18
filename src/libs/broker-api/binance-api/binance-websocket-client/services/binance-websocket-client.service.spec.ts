import { Test, TestingModule } from '@nestjs/testing';

import { BinanceWebsocketClientService } from './binance-websocket-client.service';

describe('BinanceWebsocketClientService', () => {
  let service: BinanceWebsocketClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BinanceWebsocketClientService],
    }).compile();

    service = module.get<BinanceWebsocketClientService>(BinanceWebsocketClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
