import { BigNumber } from 'bignumber.js';

import { getBigNumber, getBigNumberStrictly } from './get-big-number';

type BigNumberValueType = BigNumber | number | string;

/**
 * v1 + v2
 * don't throw errors.
 *
 * @param {BigNumber.Value} v1
 * @param {BigNumber.Value} v2
 * @returns {number}
 */
export function add(v1: BigNumberValueType, v2: BigNumberValueType): number {
  try {
    const a = getBigNumber(v1);
    const b = getBigNumber(v2);
    return a.plus(b).toNumber();
  } catch {
    return NaN;
  }
}

/**
 * v1 - v2
 * don't throw errors.
 *
 * @param {BigNumber.Value} v1
 * @param {BigNumber.Value} v2
 * @returns {number}
 */
export function subtract(v1: BigNumberValueType, v2: BigNumberValueType): number {
  try {
    const a = getBigNumber(v1);
    const b = getBigNumber(v2);
    return a.minus(b).toNumber();
  } catch {
    return NaN;
  }
}

/**
 * v1 * v2
 * don't throw errors.
 *
 * @param {BigNumber.Value} v1
 * @param {BigNumber.Value} v2
 * @returns {number}
 */
export function multiple(v1: BigNumberValueType, v2: BigNumberValueType): number {
  try {
    const a = getBigNumber(v1);
    const b = getBigNumber(v2);
    return a.multipliedBy(b).toNumber();
  } catch {
    return NaN;
  }
}

/**
 * v1 / v2
 * don't throw errors.
 *
 * @param {BigNumber.Value} v1
 * @param {BigNumber.Value} v2
 * @returns {number}
 */
export function divide(v1: BigNumberValueType, v2: BigNumberValueType): number {
  try {
    const a = getBigNumber(v1);
    const b = getBigNumber(v2);
    return a.dividedBy(b).toNumber();
  } catch {
    return NaN;
  }
}

/**
 * v1 + v2
 * throw errors.
 *
 * @param {BigNumber.Value} v1
 * @param {BigNumber.Value} v2
 * @returns {number}
 */
export function addStrictly(v1: BigNumberValueType, v2: BigNumberValueType): number {
  const a = getBigNumberStrictly(v1);
  const b = getBigNumberStrictly(v2);
  return a.plus(b).toNumber();
}

/**
 * v1 - v2
 * throw errors.
 *
 * @param {BigNumber.Value} v1
 * @param {BigNumber.Value} v2
 * @returns {number}
 */
export function subtractStrictly(v1: BigNumberValueType, v2: BigNumberValueType): number {
  const a = getBigNumberStrictly(v1);
  const b = getBigNumberStrictly(v2);
  return a.minus(b).toNumber();
}

/**
 * v1 * v2
 * throw errors.
 *
 * @param {BigNumber.Value} v1
 * @param {BigNumber.Value} v2
 * @returns {number}
 */
export function multipleStrictly(v1: BigNumberValueType, v2: BigNumberValueType): number {
  const a = getBigNumberStrictly(v1);
  const b = getBigNumberStrictly(v2);
  return a.multipliedBy(b).toNumber();
}

/**
 * v1 / v2
 * throw errors.
 *
 * @param {BigNumber.Value} v1
 * @param {BigNumber.Value} v2
 * @returns {number}
 */
export function divideStrictly(v1: BigNumberValueType, v2: BigNumberValueType): number {
  const a = getBigNumberStrictly(v1);
  const b = getBigNumberStrictly(v2);
  return a.dividedBy(b).toNumber();
}

/**
 * get floored number by specific decimal places.
 *
 * @param {number} value - number to floor.
 * @param {number} decimalPlace - where to floor.
 * @returns {number}
 */
export function floorByDigit(value: BigNumberValueType, decimalPlace = 0): number {
  const bigNumber = getBigNumber(value);

  // fix number with priceDigit (0.123456 -> 0.1234)
  const characteristic = getBigNumber(10).pow(decimalPlace);
  // If input is specified as a number greater than 15 digits,
  // it will result in an error so cast once to string.
  // @see https://github.com/MikeMcl/bignumber.js/issues/148
  const multiplied = bigNumber.multipliedBy(characteristic);
  return multiplied.integerValue(BigNumber.ROUND_FLOOR).dividedBy(characteristic).toNumber();
}

/**
 * value ** digit
 * throw errors.
 *
 * @param {number} value
 * @param {number} digit
 * @returns {number}
 */
export function pow(value: number, digit: number): number {
  const bigVal = new BigNumber(value);
  return bigVal.pow(digit).toNumber();
}

/**
 * comma separated every 3 digits
 * eg:
 *  formatComma('1029324') => '1,029,324'
 *  formatComma('1310.19723') => '1,310.19723'
 *  formatComma('1310.19723', 1) => '1,310.2'
 *  formatComma('0.02504347') => '0.02504347'
 *
 * @param {string} value
 * @param digit
 * @returns {string}
 */
export function formatComma(value: string | number, digit?: number): string {
  const fmt: BigNumber.Format = {
    prefix: '',
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: '',
    fractionGroupSize: 0,
    suffix: '',
  };
  const bigVal = new BigNumber(value);
  return digit ? bigVal.toFormat(digit, fmt) : bigVal.toFormat(fmt);
}
