import { BigNumber } from 'bignumber.js';

export function getBigNumber(val: any): BigNumber {
  // Null Validation
  if (val === null || val === undefined || val === '') {
    val = 0;
  }

  // Type Validation and Conversion
  if (val instanceof BigNumber) {
    return val;
  } else if (typeof val === 'string') {
    return new BigNumber(val);
  } else if (typeof val === 'number') {
    const stringifiedValue = val.toString();
    return new BigNumber(stringifiedValue);
  } else {
    // fallback value
    return new BigNumber(NaN);
  }
}

export function getBigNumberStrictly(val: any): BigNumber {
  // Null Validation
  if (val === null || val === undefined || val === '') {
    throw new Error(`[util] getBigNumberStrictly: Invalid value passes.`);
  }

  // Type Validation and Conversion
  if (val instanceof BigNumber) {
    return val;
  } else if (typeof val === 'string') {
    return new BigNumber(val);
  } else if (typeof val === 'number') {
    const stringifiedValue = val.toString();

    if (stringifiedValue.length <= 15) {
      return new BigNumber(stringifiedValue);
    } else {
      throw new Error('[util] getBigNumberStrictly: Invalid value passes. (over 15 digits)');
    }
  } else {
    throw new Error('[util] getBigNumberStrictly: Invalid type value passes.');
  }
}
