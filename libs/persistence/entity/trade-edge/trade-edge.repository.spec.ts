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

  describe('insertTradeEdges', () => {
    it('should insert new trade edges', async () => {
      const newData = {
        ...defaultData,
        id: 'insert-data',
      };
      const res = await repository.insertTradeEdges([
        {
          pair: 'BTC/BUSD',
          fromAsset: 'BUSD',
          toAsset: 'BTC',
          side: 'buy',
          price: 45069.77,
          quantity: 0.002021,
          fee: 0.001,
          id: 'BTCBUSD_1629314958989',
          status: 'todo',
          triangleId: 'BUSD-BTC-ETH_1629314958990',
        },
        {
          pair: 'ETH/BTC',
          fromAsset: 'BTC',
          toAsset: 'ETH',
          side: 'buy',
          price: 0.067361,
          quantity: 0.029,
          fee: 0.001,
          id: 'ETHBTC_1629314958990',
          status: 'todo',
          triangleId: 'BUSD-BTC-ETH_1629314958990',
        },
        {
          pair: 'ETH/BUSD',
          fromAsset: 'ETH',
          toAsset: 'BUSD',
          side: 'sell',
          price: 3036.41,
          quantity: 0.028,
          fee: 0.001,
          id: 'ETHBUSD_1629314958990',
          status: 'todo',
          triangleId: 'BUSD-BTC-ETH_1629314958990',
        },
      ]);
      console.log(res);
      const insertedData = await repository.find({
        id: newData.id,
      });
      expect(insertedData.map(getDataFromEntity)).toEqual([newData]);
    });
  });

  describe('updateTradeEdge', () => {
    const updData = {
      ...defaultData,
      fee: 0.8,
    };
    it('should update TradeEdge', async () => {
      const res = await repository.updateTradeEdge(updData);
      expect(res.affected).toEqual(1);
      const updatedData = await repository.find();
      expect(updatedData.map(getDataFromEntity)).toEqual([updData]);
    });
  });

  describe('getTradeEdge', () => {
    it('should get TradeEdge', async () => {
      const res = await repository.getTradeEdge(defaultData.id);
      expect(getDataFromEntity(res)).toEqual(defaultData);
    });
  });
});

function getDataFromEntity(entity: TradeEdgeEntity): TradeEdgeEntityParam {
  return {
    id: entity.id,
    triangleId: entity.triangleId,
    pair: entity.pair,
    fromAsset: entity.fromAsset,
    toAsset: entity.toAsset,
    status: entity.status,
    side: entity.side,
    price: +entity.price,
    quantity: +entity.quantity,
    fee: +entity.fee,
  };
}
