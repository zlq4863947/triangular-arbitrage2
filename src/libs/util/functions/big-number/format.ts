import { BigNumber } from 'bignumber.js';

import { getBigNumberStrictly } from './get-big-number';

/**
 * get floored number by specific decimal places.
 *
 * @param {number} value - number to floor.
 * @param {number} decimalPlace - where to floor.
 * @returns {number}
 */
export function floor(value: BigNumber.Value, decimalPlace = 0): BigNumber {
  if (decimalPlace === 0) {
    return getBigNumberStrictly(value).integerValue(BigNumber.ROUND_FLOOR);
  }

  const characteristic = getBigNumberStrictly(10).pow(decimalPlace);

  return getBigNumberStrictly(value).multipliedBy(characteristic).integerValue(BigNumber.ROUND_FLOOR).dividedBy(characteristic);
}

/**
 * get floored number by specific decimal places.
 *
 * @param {number} value - number to floor.
 * @param {number} decimalPlace - where to floor.
 * @returns {number}
 */
export function floorToString(value: BigNumber.Value, decimalPlace = 0): string {
  return floor(value, decimalPlace).toString();
}

/**
 * get floored and fixed value by specific decimal places.
 *
 * @param value
 * @param decimalPlace
 */
export function floorToFixed(value: BigNumber.Value, decimalPlace = 0): string {
  return floor(value, decimalPlace).toFixed(decimalPlace);
}

/**
 * Fix value with provided digits.
 *
 * @param value
 * @param digits
 */
export function fix(value: BigNumber.Value, digits: number): string {
  const bn = getBigNumberStrictly(value);

  return bn.toFixed(digits);
}

export const stripZero = (v: BigNumber.Value) => {
  return getBigNumberStrictly(v).toString();
};

/**
 * Absolute value.
 *
 * @param value
 * @returns BigNumber
 */
export function abs(value: BigNumber.Value): BigNumber {
  const bn = getBigNumberStrictly(value);

  return bn.abs();
}

/**
 * Absolute value.
 *
 * @param value
 * @returns string
 */
export function absToString(value: BigNumber.Value): string {
  const bn = getBigNumberStrictly(value);

  return bn.abs().toString();
}
