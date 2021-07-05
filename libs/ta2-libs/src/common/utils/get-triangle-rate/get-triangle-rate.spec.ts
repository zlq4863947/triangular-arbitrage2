import { Edge } from '@ta2-libs/models';

import { getTriangleRate } from './get-triangle-rate';

describe('getTriangleRate utils functions', () => {
  it('getTriangleRate #1', () => {
    const a: Edge = {
      pair: 'ETHBTC',
      fromAsset: 'BTC',
      toAsset: 'ETH',
      side: 'buy',
      price: 0.072811,
      quantity: 21.763,
    };
    const b: Edge = {
      pair: 'EOSETH',
      fromAsset: 'ETH',
      toAsset: 'EOS',
      side: 'buy',
      price: 0.002324,
      quantity: 88.28,
    };
    const c: Edge = {
      pair: 'EOSBTC',
      fromAsset: 'EOS',
      toAsset: 'BTC',
      side: 'sell',
      price: 0.0001691,
      quantity: 523.99,
    };
    const res = getTriangleRate(a, b, c);
    expect(res).toEqual({
      rate: '-0.06664037',
      logs: {
        aRate: 'a rate = 1 / 0.072811 = 13.73418851 ETH',
        bRate: 'b rate = 13.73418851 / 0.002324 = 5909.71967102 EOS',
        cRate: 'c rate = (5909.71967102 x 0.0001691 -1) x 100 = -0.06664037%',
      },
    });
  });

  it('getTriangleRate #2', () => {
    const a: Edge = {
      pair: 'BUSD/USDT',
      fromAsset: 'BUSD',
      toAsset: 'USDT',
      side: 'sell',
      price: 0.9998,
      quantity: 13703885.49,
    };
    const b: Edge = {
      pair: 'BTC/USDT',
      fromAsset: 'USDT',
      toAsset: 'BTC',
      side: 'buy',
      price: 35097.01,
      quantity: 0.068097,
    };
    const c: Edge = {
      pair: 'BTC/BUSD',
      fromAsset: 'BTC',
      toAsset: 'BUSD',
      side: 'sell',
      price: 35105.65,
      quantity: 0.007184,
    };
    const res = getTriangleRate(a, b, c);
    expect(res).toEqual({
      rate: '0.02461748',
      logs: {
        aRate: '',
        bRate: 'b rate = 1 / 35097.01 = 0.00002849 BTC',
        cRate: 'c rate = (0.00002849 x 35105.65 -1) x 100 = 0.02461748%',
      },
    });
  });
});
