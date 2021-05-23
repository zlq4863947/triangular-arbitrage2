import { BinanceApiModule, BinanceApiService } from '@arbitrage-libs/broker-api';
import { MockModule, provideMockServices } from '@arbitrage-libs/testing';
import { Test, TestingModule } from '@nestjs/testing';

import { EngineService } from './engine.service';

describe('EngineService', () => {
  let service: EngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockModule, BinanceApiModule],
      providers: [EngineService],
    }).compile();

    const binanceApiService = module.get<BinanceApiService>(BinanceApiService);
    await binanceApiService.onModuleInit();
    service = module.get<EngineService>(EngineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be get candidates', (done) => {
    service.getCandidates$().subscribe(() => {
      done();
    });
  });
});
