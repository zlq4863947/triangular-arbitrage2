import { BinanceApiModule, BinanceApiService } from '@arbitrage-libs/broker-api';
import { MockModule } from '@arbitrage-libs/testing';
import { Test, TestingModule } from '@nestjs/testing';

describe('BinanceApiService', () => {
  let service: BinanceApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockModule, BinanceApiModule],
    }).compile();

    service = module.get<BinanceApiService>(BinanceApiService);
    await service.onModuleInit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
