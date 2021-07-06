import { Test, TestingModule } from '@nestjs/testing';
import { BinanceApiService } from '@ta2-libs/broker-api';
import { useFirstValue } from '@ta2-libs/common';
import { MockModule, buildDeferInitService } from '@ta2-libs/testing';

import { DataModule, DataService } from '../data';
import { EngineService } from './engine.service';

describe('EngineService', () => {
  let service: EngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockModule, DataModule],
      providers: [EngineService],
    }).compile();

    await buildDeferInitService(module.get(BinanceApiService));
    await buildDeferInitService(module.get(DataService));
    service = module.get<EngineService>(EngineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be get candidates', async () => {
    const candidates = await useFirstValue(service.getCandidates$());
    expect(candidates.length).toEqual(20);
  });
});
