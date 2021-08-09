import { EntityRepository, InsertResult, Repository, UpdateResult } from 'typeorm';

import { TradeTriangleEntity } from './trade-triangle.entity';

export type TradeTriangleEntityParam = Omit<TradeTriangleEntity, 'createdAt' | 'updatedAt'>;

@EntityRepository(TradeTriangleEntity)
export class TradeTriangleRepository extends Repository<TradeTriangleEntity> {
  async insertTradeTriangle(param: TradeTriangleEntityParam): Promise<InsertResult> {
    return this.insert({ ...param });
  }

  async updateTradeTriangle(param: TradeTriangleEntityParam): Promise<UpdateResult> {
    return this.update(param.id, param);
  }

  async insertTradeTriangles(params: TradeTriangleEntityParam[]): Promise<TradeTriangleEntity[]> {
    return this.save({ ...params } as TradeTriangleEntity[], { reload: false });
  }

  async getTradeTriangles(id: string): Promise<TradeTriangleEntity[]> {
    return this.find({ where: { id } });
  }
}
