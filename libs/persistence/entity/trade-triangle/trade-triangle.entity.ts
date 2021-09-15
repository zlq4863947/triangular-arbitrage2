import { Timestamp, TradeStatus } from '@ta2-libs/models';
import { Column, Entity, PrimaryColumn } from 'typeorm';

import { nullableDateTransformer } from '../../common';

@Entity({
  name: 'trade_triangle',
})
export class TradeTriangleEntity {
  @PrimaryColumn({
    type: 'varchar',
    name: 'id',
    length: 30,
    comment: 'triangle id (BUSD-ETH-UFT_1626796988971)',
  })
  readonly id!: string;

  @Column({
    type: 'varchar',
    name: 'edge1_id',
    length: 30,
    comment: 'edge A id (BUSD-ETH_1626796988971)',
  })
  readonly edge1Id!: string;

  @Column({
    type: 'varchar',
    name: 'edge2_id',
    length: 30,
    comment: 'edge B id (ETH-UFT_1626796988971)',
  })
  readonly edge2Id!: string;

  @Column({
    type: 'varchar',
    name: 'edge3_id',
    length: 30,
    comment: 'edge C id (BUSD-UFT_1626796988971)',
  })
  readonly edge3Id!: string;

  @Column({
    type: 'varchar',
    name: 'rate',
    length: 20,
    comment: 'rate',
  })
  readonly rate!: string;

  @Column({
    type: 'varchar',
    name: 'status',
    length: 10,
    comment: 'status',
  })
  readonly status!: TradeStatus;

  @Column({
    type: 'datetime',
    name: 'created_at',
    precision: 3,
    default: /* istanbul ignore next */ () => 'NOW(3)',
    transformer: nullableDateTransformer,
  })
  readonly createdAt!: Timestamp;

  @Column({
    type: 'datetime',
    name: 'updated_at',
    precision: 3,
    default: /* istanbul ignore next */ () => 'NOW(3)',
    onUpdate: 'NOW(3)',
    transformer: nullableDateTransformer,
  })
  readonly updatedAt!: Timestamp;
}
