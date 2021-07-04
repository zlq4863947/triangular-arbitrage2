import { Test, TestingModule } from '@nestjs/testing';
import { BinanceApiModule, BinanceApiService } from '@ta2-libs/broker-api';
import { useFirstValue } from '@ta2-libs/common';
import { MockModule, buildDeferInitService } from '@ta2-libs/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockModule, BinanceApiModule],
      providers: [DataService],
    }).compile();

    await buildDeferInitService(module.get(BinanceApiService));
    service = await buildDeferInitService(module.get(DataService));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getTickers$', async () => {
    const tickers = await useFirstValue(service.getTickers$());
    expect(Object.keys(tickers).length).toBeGreaterThan(10);
    expect(tickers['ETHBTC']).toBeDefined();
  });

  it('getTicker$', async () => {
    expect(await useFirstValue(service.getTicker$('ETHBTC'))).toBeDefined();
    expect(await useFirstValue(service.getTicker$('ethbtc'))).toBeDefined();
  });

  it('onCustomFilled$', async (done) => {
    const data = { t: 1 } as any;
    service.onCustomFilled$().subscribe((o) => {
      expect(o).toEqual(data);
      done();
    });
    service.customFilled$.next(data);
  });
});
