import { Edge } from '../../../../app/models';
import { getTriangleRate } from './get-triangle-rate';

describe('getTriangleRate util functions', () => {
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
        aRate: 'a rate = 1 / 0.072811 = 13.73418851',
        bRate: 'b rate = 13.73418851 / 0.002324 = 5909.71967102',
        cRate: 'c rate = (5909.71967102 x 0.0001691 -1) x 100 = -0.06664037',
      },
    });
  });
});
