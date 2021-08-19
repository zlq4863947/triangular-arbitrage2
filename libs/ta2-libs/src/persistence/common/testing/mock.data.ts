import { TradeStatus } from '@ta2-libs/models';
import { TradeTriangleEntityParam } from '@ta2-libs/persistence';
import { TradeEdgeEntityParam } from '@ta2-libs/persistence/entity/trade-edge/trade-edge.repository';

export const mockTradeTriangleEntityParam: TradeTriangleEntityParam = {
  id: 'BUSD-ETH-UFT_1626796988971',
  edge1Id: 'BUSD-ETH_1626796988971',
  edge2Id: 'ETH-UFT_1626796988971',
  edge3Id: 'BUSD-ETH_1626796988971',
  rate: '0.54189005',
  status: TradeStatus.Todo,
};

export const mockTradeEdgeEntityParam: TradeEdgeEntityParam = {
  id: 'BUSD-ETH_1626796988971',
  triangleId: 'BUSD-ETH-UFT_1626796988971',
  status: TradeStatus.Todo,
  pair: 'BTC/BUSD',
  fromAsset: 'BUSD',
  toAsset: 'BTC',
  side: 'buy',
  price: 43454.02,
  quantity: 0.002081,
  fee: 0.001,
};
