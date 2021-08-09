import { TradeStatus } from '@ta2-libs/models';
import { TradeTriangleEntityParam } from '@ta2-libs/persistence';

export const mockTradeTriangleEntityParam: TradeTriangleEntityParam = {
  id: 'BUSD-ETH-UFT_1626796988971',
  edge1Id: 'BUSD-ETH_1626796988971',
  edge2Id: 'ETH-UFT_1626796988971',
  edge3Id: 'BUSD-ETH_1626796988971',
  rate: '0.54189005',
  status: TradeStatus.Todo,
};
