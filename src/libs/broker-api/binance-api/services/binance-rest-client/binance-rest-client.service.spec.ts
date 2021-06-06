import { Test, TestingModule } from '@nestjs/testing';

import { BinanceRestClient } from './binance-rest-client.service';

describe('BinanceRestClient', () => {
  let service: BinanceRestClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BinanceRestClient],
    }).compile();

    service = module.get<BinanceRestClient>(BinanceRestClient);
    await service.initialize();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('fetchTradingFees', async () => {
    const res = await service.fetchTradingFees();
    expect(Object.keys(res).length).toBeGreaterThan(0);
  });
});
