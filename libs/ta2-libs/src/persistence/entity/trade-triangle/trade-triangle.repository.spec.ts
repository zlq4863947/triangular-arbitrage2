import { TradeTriangleEntity } from '@ta2-libs/persistence';
import { mockTradeTriangleEntityParam } from '@ta2-libs/persistence/common/testing';

import { EntityTestBed } from '../../common/testing/entity-test-bed';
import { TradeTriangleEntityParam, TradeTriangleRepository } from './trade-triangle.repository';

describe('trade-triangle.repository', () => {
  let reposity: TradeTriangleRepository;
  const defaultData = mockTradeTriangleEntityParam;

  beforeAll(async () => {
    await EntityTestBed.setup();
    reposity = EntityTestBed.getRepository(TradeTriangleRepository);
  });

  afterAll(async () => {
    await EntityTestBed.cleanup();
  });

  beforeEach(async () => {
    await EntityTestBed.reset();
    await reposity.insertTradeTriangle(defaultData);
  });

  describe('insertTradeTriangle', () => {
    it('should insert new candlestick', async () => {
      const newData = {
        ...defaultData,
        id: 'insert-data',
        rate: '0.8',
      };
      await reposity.insertTradeTriangle(newData);
      const insertedData = await reposity.find({
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
      const res = await reposity.updateTradeTriangle(updData);
      expect(res.affected).toEqual(1);
      const updatedData = await reposity.find();
      expect(updatedData.map(getDataFromEntity)).toEqual([updData]);
    });
  });

  describe('getTradeTriangles', () => {
    it('should get getTradeTriangles', async () => {
      const res = await reposity.getTradeTriangles(defaultData.id);
      expect([getDataFromEntity(res[0])]).toEqual([defaultData]);
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
