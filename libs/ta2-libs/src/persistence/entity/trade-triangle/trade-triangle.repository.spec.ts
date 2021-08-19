import { TradeTriangleEntity } from '@ta2-libs/persistence';
import { mockTradeTriangleEntityParam } from '@ta2-libs/persistence/common/testing';

import { EntityTestBed } from '../../common/testing/entity-test-bed';
import { TradeTriangleEntityParam, TradeTriangleRepository } from './trade-triangle.repository';

describe('trade-triangle.repository', () => {
  let repository: TradeTriangleRepository;
  const defaultData = mockTradeTriangleEntityParam;

  beforeAll(async () => {
    await EntityTestBed.setup();
    repository = EntityTestBed.getRepository(TradeTriangleRepository);
  });

  afterAll(async () => {
    await EntityTestBed.cleanup();
  });

  beforeEach(async () => {
    await EntityTestBed.reset();
    await repository.insertTradeTriangle(defaultData);
  });

  describe('insertTradeTriangle', () => {
    it('should insert new trade triangle', async () => {
      const newData = {
        ...defaultData,
        id: 'insert-data',
        rate: '0.8',
      };
      await repository.insertTradeTriangle(newData);
      const insertedData = await repository.find({
        id: newData.id,
      });
      expect(insertedData.map(getDataFromEntity)).toEqual([newData]);
    });
  });

  describe('updateTradeTriangle', () => {
    const updData = {
      ...defaultData,
      rate: '0.8',
    };
    it('should update TradeTriangle', async () => {
      const res = await repository.updateTradeTriangle(updData);
      expect(res.affected).toEqual(1);
      const updatedData = await repository.find();
      expect(updatedData.map(getDataFromEntity)).toEqual([updData]);
    });
  });

  describe('getTradeTriangles', () => {
    it('should get tradeTriangles', async () => {
      const res = await repository.getTradeTriangles(defaultData.id);
      expect([getDataFromEntity(res[0])]).toEqual([defaultData]);
    });
  });

  describe('getTradeTriangleByEdgeId', () => {
    it('should get tradeTriangleByEdgeId', async () => {
      const res = await repository.getTradeTriangleByEdgeId(defaultData.edge1Id);
      expect(getDataFromEntity(res)).toEqual(defaultData);
      const res2 = await repository.getTradeTriangleByEdgeId(defaultData.edge2Id);
      expect(getDataFromEntity(res2)).toEqual(defaultData);
      const res3 = await repository.getTradeTriangleByEdgeId(defaultData.edge3Id);
      expect(getDataFromEntity(res3)).toEqual(defaultData);
    });
  });
});

function getDataFromEntity(entity: TradeTriangleEntity): TradeTriangleEntityParam {
  return {
    id: entity.id,
    edge1Id: entity.edge1Id,
    edge2Id: entity.edge2Id,
    edge3Id: entity.edge3Id,
    rate: entity.rate,
    status: entity.status,
  };
}
