import { mockData } from '@ta2-libs/testing';

import { Edge } from '../../../models';
import { getEdgeOrderAmount } from './get-edge-order-amount';

describe('getEdgeOrderAmount utils functions', () => {
  it('getEdgeOrderAmount #1', () => {
    const edge: Edge = {
      pair: 'BTC/BUSD',
      fromAsset: 'BUSD',
      toAsset: 'BTC',
      side: 'buy',
      price: 33457.48,
      quantity: 0.050511,
    };
    const pairInfo = mockData.pairInfo[edge.pair];
    const res = getEdgeOrderAmount(edge, pairInfo, 0);
    expect(res).toEqual(0.001195);
  });
  it('getEdgeOrderAmount #2', () => {
    const edge: Edge = { pair: 'ETH/BUSD', fromAsset: 'BUSD', toAsset: 'ETH', side: 'buy', price: 1978.33, quantity: 1.9686 };
    const pairInfo = mockData.pairInfo[edge.pair];
    const res = getEdgeOrderAmount(edge, pairInfo, 0);
    expect(res).toEqual(0.001195);
  });
});
