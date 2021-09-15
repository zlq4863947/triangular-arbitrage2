import { ObjectType } from 'typeorm';

import { TradeEdgeEntity, TradeEdgeRepository, TradeTriangleEntity, TradeTriangleRepository } from '../entity';

export const allEntityTypes: ObjectType<any>[] = [TradeTriangleEntity, TradeEdgeEntity];

export const allRepositoryTypes: ObjectType<any>[] = [TradeTriangleRepository, TradeEdgeRepository];
