import { add, divide, floor, multiple } from '@ta2-libs/commons';
import { Config } from '@ta2-libs/config';
import { Market } from 'ccxt';

import { Edge } from '../../../models';

/**
 * 获取单边下单数量
 * @param edge
 * @param pairInfo
 * @param fee
 */
export function getEdgeOrderAmount(edge: Edge, pairInfo: Market, fee: number): number {
  const limits = pairInfo.limits;
  const precision = pairInfo.precision.amount;
  const minAmount = divide(limits.cost.min, edge.price);
  const attachedAmount = add(fee, multiple(minAmount, Config.root.orderTimes > 1 ? Config.root.orderTimes : 0.1));

  return floor(add(minAmount, attachedAmount), precision).toNumber();
}
