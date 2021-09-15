import { Test, TestingModule } from '@nestjs/testing';
import { BinanceApiModule, BinanceApiService } from '@ta2-libs/broker-api';
import { MockModule } from '@ta2-libs/testing';

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
