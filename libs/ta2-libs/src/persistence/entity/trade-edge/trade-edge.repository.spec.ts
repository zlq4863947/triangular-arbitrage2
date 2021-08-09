import { TradeEdgeEntity } from '@ta2-libs/persistence';
import { mockTradeEdgeEntityParam } from '@ta2-libs/persistence/common/testing';

import { EntityTestBed } from '../../common/testing/entity-test-bed';
import { TradeEdgeEntityParam, TradeEdgeRepository } from './trade-edge.repository';

describe('trade-edge.repository', () => {
  let repository: TradeEdgeRepository;
  const defaultData = mockTradeEdgeEntityParam;

  beforeAll(async () => {
    await EntityTestBed.setup();
    repository = EntityTestBed.getRepository(TradeEdgeRepository);
  });

  afterAll(async () => {
    await EntityTestBed.cleanup();
  });

  beforeEach(async () => {
    await EntityTestBed.reset();
    await repository.insertTradeEdge(defaultData);
  });

  describe('insertTradeEdge', () => {
    it('should insert new trade edge', async () => {
      const newData = {
        ...defaultData,
        id: 'insert-data',
      };
      await repository.insertTradeEdge(newData);
      const insertedData = await repository.find({
        id: newData.id,
      });
      expect(insertedData.map(getDataFromEntity)).toEqual([newData]);
    });
  });

  describe('updateTradeEdge', () => {
    const updData = {
      ...defaultData,
      rate: '0.8',
    };
    it('should update TradeEdge', async () => {
      const res = await repository.updateTradeEdge(updData);
      expect(res.affected).toEqual(1);
      const updatedData = await repository.find();
      expect(updatedData.map(getDataFromEntity)).toEqual([updData]);
    });
  });

  describe('getTradeEdges', () => {
    it('should get getTradeEdges', async () => {
      const res = await repository.getTradeEdges(defaultData.id);
      expect([getDataFromEntity(res[0])]).toEqual([defaultData]);
    });
  });
});

function getDataFromEntity(entity: TradeEdgeEntity): TradeEdgeEntityParam {
  return {
    id: entity.id,
    pair: entity.pair,
    fromAsset: entity.fromAsset,
    toAsset: entity.toAsset,
    status: entity.status,
    side: entity.side,
    price: entity.price,
    quantity: entity.quantity,
    fee: entity.fee,
  };
}
