import { BigNumber } from 'bignumber.js';

import { getBigNumberStrictly } from './get-big-number';

export function equal(v1: BigNumber.Value, v2: BigNumber.Value): boolean {
  const a = getBigNumberStrictly(v1);
  const b = getBigNumberStrictly(v2);

  return a.isEqualTo(b);
}

export function gt(v1: BigNumber.Value, v2: BigNumber.Value): boolean {
  const a = getBigNumberStrictly(v1);
  const b = getBigNumberStrictly(v2);

  return a.gt(b);
}

export function lt(v1: BigNumber.Value, v2: BigNumber.Value): boolean {
  const a = getBigNumberStrictly(v1);
  const b = getBigNumberStrictly(v2);

  return a.lt(b);
}

export function gte(v1: BigNumber.Value, v2: BigNumber.Value): boolean {
  const a = getBigNumberStrictly(v1);
  const b = getBigNumberStrictly(v2);

  return a.gte(b);
}

export function lte(v1: BigNumber.Value, v2: BigNumber.Value): boolean {
  const a = getBigNumberStrictly(v1);
  const b = getBigNumberStrictly(v2);

  return a.lte(b);
}

export function isPositive(v: BigNumber.Value): boolean {
  const bn = getBigNumberStrictly(v);

  return bn.isPositive() && bn.isGreaterThan(0);
}

export function isNegative(v: BigNumber.Value): boolean {
  const bn = getBigNumberStrictly(v);

  return bn.isNegative() && bn.isLessThan(0);
}

export function isZero(v: BigNumber.Value): boolean {
  return getBigNumberStrictly(v).isZero();
}

export function isFiniteStrictly(v: BigNumber.Value): boolean {
  return getBigNumberStrictly(v).isFinite();
}
