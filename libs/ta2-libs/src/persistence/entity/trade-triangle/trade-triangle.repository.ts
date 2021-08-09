import { TradeStatus } from '@ta2-libs/models';
import { EntityRepository, InsertResult, Repository, UpdateResult } from 'typeorm';

import { TradeTriangleEntity } from './trade-triangle.entity';

export type TradeTriangleEntityParam = Omit<TradeTriangleEntity, 'createdAt' | 'updatedAt'>;

@EntityRepository(TradeTriangleEntity)
export class TradeTriangleRepository extends Repository<TradeTriangleEntity> {
  insertTradeTriangle(param: TradeTriangleEntityParam): Promise<InsertResult> {
    return this.insert({ ...param });
  }

  updateTradeTriangle(param: TradeTriangleEntityParam): Promise<UpdateResult> {
    return this.update(param.id, param);
  }

  insertTradeTriangles(params: TradeTriangleEntityParam[]): Promise<TradeTriangleEntity[]> {
    return this.save({ ...params } as TradeTriangleEntity[], { reload: false });
  }

  getTradeTriangles(id: string): Promise<TradeTriangleEntity[]> {
    return this.find({ where: { id } });
  }

  getActiveTradeTriangles(): Promise<TradeTriangleEntity[]> {
    return this.find({ where: { status: TradeStatus.Open } });
  }
}
