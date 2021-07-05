import { Test, TestingModule } from '@nestjs/testing';
import { BinanceApiService } from '@ta2-libs/broker-api';
import { DataService } from '@ta2-libs/modules';
import { buildDeferInitService } from '@ta2-libs/testing';

import { Triangle } from '../../models';
import { TradeService } from './trade.service';

describe('TradeService', () => {
  let service: TradeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [AppModule],
    }).compile();

    await buildDeferInitService(module.get(BinanceApiService));
    await buildDeferInitService(module.get(DataService));
    service = await buildDeferInitService(module.get(TradeService));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
        { pair: 'BUSD/DAI', fromAsset: 'BUSD', toAsset: 'DAI', side: 'sell', price: 0.9988, quantity: 44029.98 },
        { pair: 'BTC/DAI', fromAsset: 'DAI', toAsset: 'BTC', side: 'buy', price: 35858.45, quantity: 0.007142 },
        { pair: 'BTC/BUSD', fromAsset: 'BTC', toAsset: 'BUSD', side: 'sell', price: 35879.98, quantity: 0.002621 },
      ],
      rate: '0.06004163',
      logs: {
        aRate: '',
        bRate: 'b rate = 1 / 35858.45 = 0.00002788 BTC',
        cRate: 'c rate = (0.00002788 x 35879.98 -1) x 100 = 0.06004163%',
      },
      time: 1622962753387,
    };

    const tradeTriangle = await service.getTradeTriangle(triangle);
    expect(tradeTriangle).toEqual({
      id: 'BUSD-DAI-BTC',
      edges: [
        {
          pair: 'BUSD/DAI',
          fromAsset: 'BUSD',
          toAsset: 'DAI',
          side: 'sell',
          price: 0.9988,
          quantity: 33.03,
          fee: 0,
          id: 'BUSDDAI_1625337809529',
          status: 'todo',
        },
        {
          pair: 'BTC/DAI',
          fromAsset: 'DAI',
          toAsset: 'BTC',
          side: 'buy',
          price: 35858.45,
          quantity: 0.000921,
          fee: 0.001,
          id: 'BTCDAI_1625337812888',
          status: 'todo',
        },
        {
          pair: 'BTC/BUSD',
          fromAsset: 'BTC',
          toAsset: 'BUSD',
          side: 'sell',
          price: 35879.98,
          quantity: 0.00092,
          fee: 0,
          id: 'BTCBUSD_1625337812888',
          status: 'todo',
        },
      ],
      rate: '0.06004163',
      logs: {
        aRate: '',
        bRate: 'b rate = 1 / 35858.45 = 0.00002788 BTC',
        cRate: 'c rate = (0.00002788 x 35879.98 -1) x 100 = 0.06004163%',
      },
      time: 1622962753387,
      openTime: 0,
      status: 'todo',
    });
    done();
  });

  it('getTradeTriangle #8', async (done) => {
    const triangle: Triangle = {
      id: 'BUSD-ETH-DEXE',
      edges: [
        { pair: 'ETH/BUSD', fromAsset: 'BUSD', toAsset: 'ETH', side: 'buy', price: 18, quantity: 2.9208 },
        { pair: 'DEXE/ETH', fromAsset: 'ETH', toAsset: 'DEXE', side: 'buy', price: 0.002035, quantity: 3.42 },
        { pair: 'DEXE/BUSD', fromAsset: 'DEXE', toAsset: 'BUSD', side: 'sell', price: 3.752, quantity: 6.481 },
      ],
      rate: '0.19697973',
      logs: {
        aRate: 'a rate = 1 / 1840.11 = 0.00054344 ETH',
        bRate: 'b rate = 0.00054344 / 0.002035 = 0.26704951 DEXE',
        cRate: 'c rate = (0.26704951 x 3.752 -1) x 100 = 0.19697973%',
      },
      time: 1624802323206,
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

  it('getTradeTriangle #9', async (done) => {
    const triangle: Triangle = {
      id: 'BUSD-BTC-BAND',
      edges: [
        { pair: 'BTC/BUSD', fromAsset: 'BUSD', toAsset: 'BTC', side: 'buy', price: 33457.48, quantity: 0.050511 },
        { pair: 'BAND/BTC', fromAsset: 'BTC', toAsset: 'BAND', side: 'buy', price: 0.00016401, quantity: 141.5 },
        { pair: 'BAND/BUSD', fromAsset: 'BAND', toAsset: 'BUSD', side: 'sell', price: 5.494, quantity: 0.031 },
      ],
      rate: '0.12098174',
      logs: {
        aRate: 'a rate = 1 / 33457.48 = 0.00002988 BTC',
        bRate: 'b rate = 0.00002988 / 0.00016401 = 0.18223695 BAND',
        cRate: 'c rate = (0.18223695 x 5.494 -1) x 100 = 0.12098174%',
      },
      time: 1625283670606,
    };
    const tradeTriangle = await service.getTradeTriangle(triangle);
    expect(tradeTriangle).toEqual({
      id: 'BUSD-BTC-BAND',
      edges: [
        {
          pair: 'BTC/BUSD',
          fromAsset: 'BUSD',
          toAsset: 'BTC',
          side: 'buy',
          price: 33457.48,
          quantity: 0.000985,
          fee: 0,
          id: 'BTCBUSD_1625337573207',
          status: 'todo',
        },
        {
          pair: 'BAND/BTC',
          fromAsset: 'BTC',
          toAsset: 'BAND',
          side: 'buy',
          price: 0.00016401,
          quantity: 6,
          fee: 0.001,
          id: 'BANDBTC_1625337662958',
          status: 'todo',
        },
        {
          pair: 'BAND/BUSD',
          fromAsset: 'BAND',
          toAsset: 'BUSD',
          side: 'sell',
          price: 5.494,
          quantity: 5.9,
          fee: 0,
          id: 'BANDBUSD_1625337672012',
          status: 'todo',
        },
      ],
      rate: '0.12098174',
      logs: {
        aRate: 'a rate = 1 / 33457.48 = 0.00002988 BTC',
        bRate: 'b rate = 0.00002988 / 0.00016401 = 0.18223695 BAND',
        cRate: 'c rate = (0.18223695 x 5.494 -1) x 100 = 0.12098174%',
      },
      time: 1625283670606,
      openTime: 0,
      status: 'todo',
    });
    done();
  });
});
