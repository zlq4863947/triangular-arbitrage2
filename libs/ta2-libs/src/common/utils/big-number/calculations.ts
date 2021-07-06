import { BigNumber } from 'bignumber.js';

import { getBigNumberStrictly } from './get-big-number';

/**
 * v1 + v2
 * throw errors.
 *
 * @param {BigNumber.Value} v1
 * @param {BigNumber.Value[]} v2
 * @returns {BigNumber}
 */
export function add(v1: BigNumber.Value, ...v2: BigNumber.Value[]): BigNumber {
  let result = getBigNumberStrictly(v1);
  for (const v of v2) {
    const b = getBigNumberStrictly(v);
    result = result.plus(b);
  }

  return result;
}

/**
 * v1 + v2
 * throw errors.
 *
 * @param {BigNumber.Value} v1
 * @param {BigNumber.Value[]} v2
 * @returns {number}
 */
export function addToString(v1: BigNumber.Value, ...v2: BigNumber.Value[]): string {
  return add(v1, ...v2).toString();
}

/**
 * v1 - v2
 * throw errors.
 *
 * @param {BigNumber.Value} v1
 * @param {BigNumber.Value[]} v2
 * @returns {BigNumber}
 */
export function subtract(v1: BigNumber.Value, ...v2: BigNumber.Value[]): BigNumber {
  let result = getBigNumberStrictly(v1);
  for (const v of v2) {
    const b = getBigNumberStrictly(v);
    result = result.minus(b);
  }

  return result;
}

/**
 * v1 - v2
 * throw errors.
 *
 * @param {BigNumber.Value} v1
 * @param {BigNumber.Value[]} v2
 * @returns {string}
 */
export function subtractToString(v1: BigNumber.Value, ...v2: BigNumber.Value[]): string {
  return subtract(v1, ...v2).toString();
}

/**
 * v1 * v2
 * throw errors.
 *
 * @param {BigNumber.Value} v1
 * @param {BigNumber.Value[]} v2
 * @returns {BigNumber}
 */
export function multiple(v1: BigNumber.Value, ...v2: BigNumber.Value[]): BigNumber {
  let result = getBigNumberStrictly(v1);
  for (const v of v2) {
    const b = getBigNumberStrictly(v);
    result = result.multipliedBy(b);
  }

  return result;
}

/**
 * v1 * v2
 * throw errors.
 *
 * @param {BigNumber.Value} v1
 * @param {BigNumber.Value} v2
 * @returns {number}
 */
export function multipleToString(v1: BigNumber.Value, ...v2: BigNumber.Value[]): string {
  return multiple(v1, ...v2).toString();
}

/**
 * v1 / v2
 * throw errors.
 *
 * @param {BigNumber.Value} v1
 * @param {BigNumber.Value[]} v2
 * @returns {BigNumber}
 */
export function divide(v1: BigNumber.Value, ...v2: BigNumber.Value[]): BigNumber {
  let result = getBigNumberStrictly(v1);
  for (const v of v2) {
    const b = getBigNumberStrictly(v);
    result = result.dividedBy(b);
  }

  return result;
}

/**
 * v1 / v2
 * throw errors.
 *
 * @param {BigNumber.Value} v1
 * @param {BigNumber.Value[]} v2
 * @returns {number}
 */
export function divideToString(v1: BigNumber.Value, ...v2: BigNumber.Value[]): string {
  return divide(v1, ...v2).toString();
}

export function opposite(v: BigNumber.Value): BigNumber {
  return getBigNumberStrictly(v).multipliedBy(-1);
}

export function oppositeToString(v: BigNumber.Value): string {
  return opposite(v).toString();
}
