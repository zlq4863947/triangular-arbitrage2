import { Timestamp, TradeStatus } from '@ta2-libs/models';
import { Column, Entity, PrimaryColumn } from 'typeorm';

import { getFloorByDigitsTransformer, nullableDateTransformer } from '../../common';

@Entity({
  name: 'trade_edge',
})
export class TradeEdgeEntity {
  @PrimaryColumn({
    type: 'varchar',
    name: 'id',
    length: 30,
    comment: 'edge id (BUSD-ETH_1626796988971)',
  })
  readonly id!: string;

  @Column({
    type: 'varchar',
    name: 'triangle_id',
    length: 30,
    comment: 'triangle id (BUSD-ETH-UFT_1626796988971)',
  })
  readonly triangleId!: string;

  @Column({
    type: 'varchar',
    name: 'pair',
    length: 10,
    comment: 'pair',
  })
  readonly pair!: string;

  @Column({
    type: 'varchar',
    name: 'from_asset',
    length: 10,
    comment: 'from asset',
  })
  readonly fromAsset!: string;

  @Column({
    type: 'varchar',
    name: 'to_asset',
    length: 10,
    comment: 'to asset',
  })
  readonly toAsset!: string;

  @Column({
    type: 'varchar',
    name: 'side',
    length: 10,
    comment: 'side',
  })
  readonly side!: 'sell' | 'buy';

  @Column({
    type: 'decimal',
    name: 'price',
    precision: 21,
    scale: 9,
    unsigned: true,
    comment: 'price',
    default: /* istanbul ignore next */ () => '0.0',
    transformer: getFloorByDigitsTransformer(9),
  })
  readonly price!: number;

  @Column({
    type: 'decimal',
    name: 'quantity',
    precision: 21,
    scale: 9,
    unsigned: true,
    comment: 'quantity',
    default: /* istanbul ignore next */ () => '0.0',
    transformer: getFloorByDigitsTransformer(9),
  })
  readonly quantity!: number;

  @Column({
    type: 'decimal',
    name: 'fee',
    precision: 21,
    scale: 9,
    unsigned: true,
    comment: 'fee',
    default: /* istanbul ignore next */ () => '0.0',
    transformer: getFloorByDigitsTransformer(9),
  })
  readonly fee!: number;

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
