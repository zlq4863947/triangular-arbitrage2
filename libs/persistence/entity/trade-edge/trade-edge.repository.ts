import { TradeStatus } from '@ta2-libs/models';
import { EntityRepository, InsertResult, Repository, UpdateResult } from 'typeorm';

import { TradeEdgeEntity } from './trade-edge.entity';

export type TradeEdgeEntityParam = Omit<TradeEdgeEntity, 'createdAt' | 'updatedAt'>;

@EntityRepository(TradeEdgeEntity)
export class TradeEdgeRepository extends Repository<TradeEdgeEntity> {
  insertTradeEdge(param: TradeEdgeEntityParam): Promise<InsertResult> {
    return this.insert({ ...param });
  }

  updateTradeEdge(param: Partial<TradeEdgeEntityParam>): Promise<UpdateResult> {
    return this.update(param.id, param);
  }

  insertTradeEdges(params: TradeEdgeEntityParam[]): Promise<TradeEdgeEntity[]> {
    return this.save([...params] as TradeEdgeEntity[], { reload: false });
  }

  getTradeEdge(id: string): Promise<TradeEdgeEntity | undefined> {
    return this.findOne({ where: { id } });
  }

  getActiveTradeEdges(): Promise<TradeEdgeEntity[]> {
    return this.find({ where: { status: TradeStatus.Open } });
  }
}
