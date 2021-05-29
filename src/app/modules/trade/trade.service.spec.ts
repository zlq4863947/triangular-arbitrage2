import { Test, TestingModule } from '@nestjs/testing';

import { TradeService } from './trade.service';

describe('TradeService', () => {
  let service: TradeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradeService],
    }).compile();

    service = module.get<TradeService>(TradeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be checkMinAmount', () => {
    const cEdge = { pair: 'XMRUSDT', fromAsset: 'XMR', toAsset: 'USDT', side: 'sell', price: 269.79, quantity: 4.613 } as any;
    const ticker = {
      eventType: '24hrTicker',
      eventTime: 1622248480787,
      symbol: 'BTCUSDT',
      priceChange: '-2585.11000000',
      priceChangePercent: '-6.736',
      weightedAveragePrice: '36339.87556866',
      previousClose: '38368.83000000',
      currentClose: '35791.53000000',
      closeQuantity: '0.30000000',
      bestBid: '35784.29000000',
      bestBidQuantity: '0.28544500',
      bestAskPrice: '35784.30000000',
      bestAskQuantity: '0.68692300',
      open: '38376.64000000',
      high: '38416.74000000',
      low: '34684.00000000',
      baseAssetVolume: '135156.29762600',
      quoteAssetVolume: '4911563038.04993824',
      openTime: 1622162080784,
      closeTime: 1622248480784,
      firstTradeId: 876363217,
      lastTradeId: 879016145,
      trades: 2652929,
    } as any;

    const res = service.checkMinAmount(cEdge, ticker);
    expect(res).toBeDefined();
  });
});
