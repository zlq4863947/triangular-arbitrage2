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

  it('should get pairs', async (done) => {
    const res = await service.getPairs();
    console.log(res);
    // expect(service).toBeDefined();
  });
});
