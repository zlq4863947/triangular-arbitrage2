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

  it('getTradeTriangle #1', async (done) => {
    const triangle: Triangle = {
      id: 'BUSD-ETH-UFT',
      edges: [
        { pair: 'ETH/BUSD', fromAsset: 'BUSD', toAsset: 'ETH', side: 'buy', price: 2605.9, quantity: 2.56706 },
        { pair: 'UFT/ETH', fromAsset: 'ETH', toAsset: 'UFT', side: 'buy', price: 0.0005856, quantity: 5.83 },
        { pair: 'UFT/BUSD', fromAsset: 'UFT', toAsset: 'BUSD', side: 'sell', price: 1.5288, quantity: 88.46 },
      ],
      rate: '0.18249885',
      logs: {
        aRate: 'a rate = 1 / 2605.9 = 0.00038374 ETH',
        bRate: 'b rate = 0.00038374 / 0.0005856 = 0.65530153 UFT',
        cRate: 'c rate = (0.65530153 x 1.5288 -1) x 100 = 0.18249885%',
      },
      time: 1622904641801,
    };

    const tradeTriangle = await service.getTradeTriangle(triangle);
    expect(tradeTriangle).toEqual({
      id: 'BUSD-ETH-UFT',
      edges: [
        {
          pair: 'ETH/BUSD',
          fromAsset: 'BUSD',
          toAsset: 'ETH',
          side: 'buy',
          price: 2605.9,
          quantity: 0.00001,
          status: 'todo',
        },
        {
          pair: 'UFT/ETH',
          fromAsset: 'ETH',
          toAsset: 'UFT',
          side: 'buy',
          price: 0.0005856,
          quantity: 0.01,
          status: 'todo',
        },
        {
          pair: 'UFT/BUSD',
          fromAsset: 'UFT',
          toAsset: 'BUSD',
          side: 'sell',
          price: 1.5288,
          quantity: 0.01,
          status: 'todo',
        },
      ],
      openTime: 0,
      rate: '0.18249885',
      status: 'todo',
      logs: {
        aRate: 'a rate = 1 / 2605.9 = 0.00038374 ETH',
        bRate: 'b rate = 0.00038374 / 0.0005856 = 0.65530153 UFT',
        cRate: 'c rate = (0.65530153 x 1.5288 -1) x 100 = 0.18249885%',
      },
      time: 1622904641801,
    });
    done();
  });

  it('getTradeTriangle #2', async (done) => {
    const triangle: Triangle = {
      id: 'USDT-BTC-BUSD',
      edges: [
        { pair: 'BUSD/USDT', fromAsset: 'BUSD', toAsset: 'USDT', side: 'sell', price: 0.9998, quantity: 13703885.49 },
        { pair: 'BTC/USDT', fromAsset: 'USDT', toAsset: 'BTC', side: 'buy', price: 35097.01, quantity: 0.068097 },
        { pair: 'BTC/BUSD', fromAsset: 'BTC', toAsset: 'BUSD', side: 'sell', price: 35105.65, quantity: 0.007184 },
      ],
      rate: '0.02461748',
      logs: {
        aRate: '',
        bRate: 'b rate = 1 / 35097.01 = 0.00002849 BTC',
        cRate: 'c rate = (0.00002849 x 35105.65 -1) x 100 = 0.02461748%',
      },
      time: 1622930452428,
    };

    const tradeTriangle = await service.getTradeTriangle(triangle);
    expect(tradeTriangle).toEqual({
      id: 'USDT-BTC-BUSD',
      edges: [
        {
          pair: 'BUSD/USDT',
          fromAsset: 'BUSD',
          toAsset: 'USDT',
          side: 'sell',
          price: 0.9998,
          quantity: 11,
          status: 'todo',
        },
        {
          pair: 'BTC/USDT',
          fromAsset: 'USDT',
          toAsset: 'BTC',
          side: 'buy',
          price: 35097.01,
          quantity: 0.000313,
          status: 'todo',
        },
        {
          pair: 'BTC/BUSD',
          fromAsset: 'BTC',
          toAsset: 'BUSD',
          side: 'sell',
          price: 35105.65,
          quantity: 0.000313,
          status: 'todo',
        },
      ],
      rate: '0.02461748',
      logs: {
        aRate: '',
        bRate: 'b rate = 1 / 35097.01 = 0.00002849 BTC',
        cRate: 'c rate = (0.00002849 x 35105.65 -1) x 100 = 0.02461748%',
      },
      time: 1622930452428,
      openTime: 0,
      status: 'todo',
    });
    done();
  });

  it('getTradeTriangle #3', async (done) => {
    const triangle: Triangle = {
      id: 'BUSD-USDT-SFP',
      edges: [
        { pair: 'BUSD/USDT', fromAsset: 'BUSD', toAsset: 'USDT', side: 'sell', price: 0.9997, quantity: 10200109.69 },
        { pair: 'SFP/USDT', fromAsset: 'USDT', toAsset: 'SFP', side: 'buy', price: 1.1513, quantity: 1834.27 },
        { pair: 'SFP/BUSD', fromAsset: 'SFP', toAsset: 'BUSD', side: 'sell', price: 1.153, quantity: 421.97 },
      ],
      rate: '0.14765916',
      logs: { aRate: '', bRate: 'b rate = 1 / 1.1513 = 0.86858334 SFP', cRate: 'c rate = (0.86858334 x 1.153 -1) x 100 = 0.14765916%' },
      time: 1622935666409,
    };

    const tradeTriangle = await service.getTradeTriangle(triangle);
    expect(tradeTriangle).toEqual({
      id: 'USDT-BTC-BUSD',
      edges: [
        {
          pair: 'BUSD/USDT',
          fromAsset: 'BUSD',
          toAsset: 'USDT',
          side: 'sell',
          price: 0.9998,
          quantity: 11,
          status: 'todo',
        },
        {
          pair: 'BTC/USDT',
          fromAsset: 'USDT',
          toAsset: 'BTC',
          side: 'buy',
          price: 35097.01,
          quantity: 0.000313,
          status: 'todo',
        },
        {
          pair: 'BTC/BUSD',
          fromAsset: 'BTC',
          toAsset: 'BUSD',
          side: 'sell',
          price: 35105.65,
          quantity: 0.000313,
          status: 'todo',
        },
      ],
      rate: '0.02461748',
      logs: {
        aRate: '',
        bRate: 'b rate = 1 / 35097.01 = 0.00002849 BTC',
        cRate: 'c rate = (0.00002849 x 35105.65 -1) x 100 = 0.02461748%',
      },
      time: 1622930452428,
      openTime: 0,
      status: 'todo',
    });
    done();
  });

  it('getTradeTriangle #4', async (done) => {
    const triangle: Triangle = {
      id: 'BUSD-BNB-CREAM',
      edges: [
        { pair: 'BNB/BUSD', fromAsset: 'BUSD', toAsset: 'BNB', side: 'buy', price: 389.88, quantity: 0.516 },
        { pair: 'CREAM/BNB', fromAsset: 'BNB', toAsset: 'CREAM', side: 'buy', price: 0.4331, quantity: 0.53 },
        { pair: 'CREAM/BUSD', fromAsset: 'CREAM', toAsset: 'BUSD', side: 'sell', price: 169.19, quantity: 5.9022 },
      ],
      rate: '0.19719167',
      logs: {
        aRate: 'a rate = 1 / 389.88 = 0.00256489 BNB',
        bRate: 'b rate = 0.00256489 / 0.4331 = 0.00592216 CREAM',
        cRate: 'c rate = (0.00592216 x 169.19 -1) x 100 = 0.19719167%',
      },
      time: 1622937630771,
    };
    const tradeTriangle = await service.getTradeTriangle(triangle);
    expect(tradeTriangle).toEqual({
      id: 'USDT-BTC-BUSD',
      edges: [
        {
          pair: 'BUSD/USDT',
          fromAsset: 'BUSD',
          toAsset: 'USDT',
          side: 'sell',
          price: 0.9998,
          quantity: 11,
          status: 'todo',
        },
        {
          pair: 'BTC/USDT',
          fromAsset: 'USDT',
          toAsset: 'BTC',
          side: 'buy',
          price: 35097.01,
          quantity: 0.000313,
          status: 'todo',
        },
        {
          pair: 'BTC/BUSD',
          fromAsset: 'BTC',
          toAsset: 'BUSD',
          side: 'sell',
          price: 35105.65,
          quantity: 0.000313,
          status: 'todo',
        },
      ],
      rate: '0.02461748',
      logs: {
        aRate: '',
        bRate: 'b rate = 1 / 35097.01 = 0.00002849 BTC',
        cRate: 'c rate = (0.00002849 x 35105.65 -1) x 100 = 0.02461748%',
      },
      time: 1622930452428,
      openTime: 0,
      status: 'todo',
    });
    done();
  });

  it('getTradeTriangle #5', async (done) => {
    const triangle: Triangle = {
      id: 'BUSD-USDT-MATIC',
      edges: [
        { pair: 'BUSD/USDT', fromAsset: 'BUSD', toAsset: 'USDT', side: 'sell', price: 0.9995, quantity: 18687415.43 },
        { pair: 'MATIC/USDT', fromAsset: 'USDT', toAsset: 'MATIC', side: 'buy', price: 1.54271, quantity: 272 },
        { pair: 'MATIC/BUSD', fromAsset: 'MATIC', toAsset: 'BUSD', side: 'sell', price: 1.54334, quantity: 920 },
      ],
      rate: '0.04083722',
      logs: {
        aRate: '',
        bRate: 'b rate = 1 / 1.54271 = 0.64820996 MATIC',
        cRate: 'c rate = (0.64820996 x 1.54334 -1) x 100 = 0.04083722%',
      },
      time: 1622951603232,
    };
    const tradeTriangle = await service.getTradeTriangle(triangle);
    expect(tradeTriangle).toEqual({
      id: 'USDT-BTC-BUSD',
      edges: [
        {
          pair: 'BUSD/USDT',
          fromAsset: 'BUSD',
          toAsset: 'USDT',
          side: 'sell',
          price: 0.9998,
          quantity: 11,
          status: 'todo',
        },
        {
          pair: 'BTC/USDT',
          fromAsset: 'USDT',
          toAsset: 'BTC',
          side: 'buy',
          price: 35097.01,
          quantity: 0.000313,
          status: 'todo',
        },
        {
          pair: 'BTC/BUSD',
          fromAsset: 'BTC',
          toAsset: 'BUSD',
          side: 'sell',
          price: 35105.65,
          quantity: 0.000313,
          status: 'todo',
        },
      ],
      rate: '0.02461748',
      logs: {
        aRate: '',
        bRate: 'b rate = 1 / 35097.01 = 0.00002849 BTC',
        cRate: 'c rate = (0.00002849 x 35105.65 -1) x 100 = 0.02461748%',
      },
      time: 1622930452428,
      openTime: 0,
      status: 'todo',
    });
    done();
  });

  it('getTradeTriangle #6', async (done) => {
    const triangle: Triangle = {
      id: 'BUSD-USDT-BTC',
      edges: [
        { pair: 'BUSD/USDT', fromAsset: 'BUSD', toAsset: 'USDT', side: 'sell', price: 0.9995, quantity: 17521172.93 },
        { pair: 'BTC/USDT', fromAsset: 'USDT', toAsset: 'BTC', side: 'buy', price: 35801.2, quantity: 0.08422 },
        { pair: 'BTC/BUSD', fromAsset: 'BTC', toAsset: 'BUSD', side: 'sell', price: 35816.17, quantity: 0.344221 },
      ],
      rate: '0.04181424',
      logs: { aRate: '', bRate: 'b rate = 1 / 35801.2 = 0.00002793 BTC', cRate: 'c rate = (0.00002793 x 35816.17 -1) x 100 = 0.04181424%' },
      time: 1622961342209,
    };
    const tradeTriangle = await service.getTradeTriangle(triangle);
    expect(tradeTriangle).toEqual({
      id: 'BUSD-USDT-BTC',
      edges: [
        {
          pair: 'BUSD/USDT',
          fromAsset: 'BUSD',
          toAsset: 'USDT',
          side: 'sell',
          price: 0.9995,
          quantity: 11.04,
          fee: 0,
          id: 'BUSDUSDT_1622962644322',
          status: 'todo',
        },
        {
          pair: 'BTC/USDT',
          fromAsset: 'USDT',
          toAsset: 'BTC',
          side: 'buy',
          price: 35801.2,
          quantity: 0.000308,
          fee: 0.001,
          id: 'BTCUSDT_1622962644323',
          status: 'todo',
        },
        {
          pair: 'BTC/BUSD',
          fromAsset: 'BTC',
          toAsset: 'BUSD',
          side: 'sell',
          price: 35816.17,
          quantity: 0.000307,
          fee: 0,
          id: 'BTCBUSD_1622962644323',
          status: 'todo',
        },
      ],
      rate: '0.04181424',
      logs: {
        aRate: '',
        bRate: 'b rate = 1 / 35801.2 = 0.00002793 BTC',
        cRate: 'c rate = (0.00002793 x 35816.17 -1) x 100 = 0.04181424%',
      },
      time: 1622961342209,
      openTime: 0,
      status: 'todo',
    });
    done();
  });

  it('getTradeTriangle #7', async (done) => {
    const triangle: Triangle = {
      id: 'BUSD-DAI-BTC',
      edges: [
        { pair: 'BUSD/DAI', fromAsset: 'BUSD', toAsset: 'DAI', side: 'sell', price: 0.9987, quantity: 129666.37 },
        { pair: 'BTC/DAI', fromAsset: 'DAI', toAsset: 'BTC', side: 'buy', price: 35958.89, quantity: 0.335486 },
        { pair: 'BTC/BUSD', fromAsset: 'BTC', toAsset: 'BUSD', side: 'sell', price: 35990.37, quantity: 0.298124 },
      ],
      rate: '0.08754441',
      logs: { aRate: '', bRate: 'b rate = 1 / 35958.89 = 0.0000278 BTC', cRate: 'c rate = (0.0000278 x 35990.37 -1) x 100 = 0.08754441%' },
      time: 1622976861190,
    };
    const tradeTriangle = await service.getTradeTriangle(triangle);
    expect(tradeTriangle).toEqual({
      id: 'BUSD-USDT-BTC',
      edges: [
        {
          pair: 'BUSD/USDT',
          fromAsset: 'BUSD',
          toAsset: 'USDT',
          side: 'sell',
          price: 0.9995,
          quantity: 11.04,
          fee: 0,
          id: 'BUSDUSDT_1622962644322',
          status: 'todo',
        },
        {
          pair: 'BTC/USDT',
          fromAsset: 'USDT',
          toAsset: 'BTC',
          side: 'buy',
          price: 35801.2,
          quantity: 0.000308,
          fee: 0.001,
          id: 'BTCUSDT_1622962644323',
          status: 'todo',
        },
        {
          pair: 'BTC/BUSD',
          fromAsset: 'BTC',
          toAsset: 'BUSD',
          side: 'sell',
          price: 35816.17,
          quantity: 0.000307,
          fee: 0,
          id: 'BTCBUSD_1622962644323',
          status: 'todo',
        },
      ],
      rate: '0.04181424',
      logs: {
        aRate: '',
        bRate: 'b rate = 1 / 35801.2 = 0.00002793 BTC',
        cRate: 'c rate = (0.00002793 x 35816.17 -1) x 100 = 0.04181424%',
      },
      time: 1622961342209,
      openTime: 0,
      status: 'todo',
    });
    done();
  });
});
