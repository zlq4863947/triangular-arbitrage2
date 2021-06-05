import { BinanceApiModule } from '@arbitrage-libs/broker-api';
import { MockModule } from '@arbitrage-libs/testing';
import { Test, TestingModule } from '@nestjs/testing';

import { Triangle } from '../../models';
import { TradeService, checkMinAmount } from './trade.service';

describe('TradeService', () => {
  let service: TradeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockModule, BinanceApiModule],
      providers: [TradeService],
    }).compile();

    service = module.get<TradeService>(TradeService);
    await (service as any).binanceApi.onModuleInit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be checkMinAmount', () => {
    const cEdge = { pair: 'XMR/USDT', fromAsset: 'XMR', toAsset: 'USDT', side: 'sell', price: 269.79, quantity: 4.613 } as any;
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

    const res = checkMinAmount(cEdge, ticker);
    expect(res).toBeDefined();
  });

  it('testOrder', async (done) => {
    const triangle: Triangle = {
      id: 'BUSD-ETH-UFT',
      edges: [
        {
          pair: 'ETH/BUSD',
          fromAsset: 'BUSD',
          toAsset: 'ETH',
          side: 'buy',
          price: 2605.9,
          quantity: 2.56706,
        },
        {
          pair: 'UFT/ETH',
          fromAsset: 'ETH',
          toAsset: 'UFT',
          side: 'buy',
          price: 0.0005856,
          quantity: 5.83,
        },
        {
          pair: 'UFT/BUSD',
          fromAsset: 'UFT',
          toAsset: 'BUSD',
          side: 'sell',
          price: 1.5288,
          quantity: 88.46,
        },
      ],
      rate: '0.18249885',
      logs: {
        aRate: 'a rate = 1 / 2605.9 = 0.00038374 ETH',
        bRate: 'b rate = 0.00038374 / 0.0005856 = 0.65530153 UFT',
        cRate: 'c rate = (0.65530153 x 1.5288 -1) x 100 = 0.18249885%',
      },
      time: 1622904641801,
    };

    await service.getTradeTriangle(triangle);
    done();
  });
});
