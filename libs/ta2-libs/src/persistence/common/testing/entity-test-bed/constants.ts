import { ObjectType } from 'typeorm';

import { TradeTriangleEntity, TradeTriangleRepository } from '../../../entity';

export const allEntityTypes: ObjectType<any>[] = [TradeTriangleEntity];

export const allRepositoryTypes: ObjectType<any>[] = [TradeTriangleRepository];
