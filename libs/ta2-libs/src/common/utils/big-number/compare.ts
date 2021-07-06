import { BigNumber } from 'bignumber.js';

/**
 * To use variable arguments.
 *
 * `max(1, 2, 3);`
 */
type VariableArguments = BigNumber.Value[];

/**
 * To use single array argument.
 *
 * `max([1, 2, 3]);`
 */
type SingleArrayArgument = [BigNumber.Value[]];

/**
 * Get the max value in arguments.
 *
 * Return undefined if arguments includes invalid one.
 *
 * @param params
 */
export function maxOrUndefined(...params: VariableArguments | SingleArrayArgument): BigNumber.Value | undefined {
  const useArray = Array.isArray(params[0]);
  const values = (useArray ? params[0] : params) as BigNumber.Value[];

  const maximum = BigNumber.maximum.apply(null, values);

  return values.find((v) => maximum.isEqualTo(v))!;
}

/**
 * Get the max value in arguments.
 *
 * Throw error if arguments includes invalid one.
 *
 * @param params
 */
export function max(...params: VariableArguments | SingleArrayArgument): BigNumber.Value {
  const result = maxOrUndefined(...params);
  if (result === undefined) {
    throw new Error('Non numeric value passes');
  }

  return result;
}

/**
 * Get the min value in arguments.
 *
 * Return undefined if arguments includes invalid one.
 *
 * @param params
 */
export function minOrUndefined(...params: VariableArguments | SingleArrayArgument): BigNumber.Value | undefined {
  const useArray = Array.isArray(params[0]);
  const values = (useArray ? params[0] : params) as BigNumber.Value[];

  const maximum = BigNumber.minimum.apply(null, values);

  return values.find((v) => maximum.isEqualTo(v))!;
}

/**
 * Get the min value in arguments.
 *
 * Throw error if arguments includes invalid one.
 *
 * @param params
 */
export function min(...params: VariableArguments | SingleArrayArgument): BigNumber.Value {
  const result = minOrUndefined(...params);
  if (result === undefined) {
    throw new Error('Non numeric value passes');
  }

  return result;
}

/**
 * Get the sum value in arguments.
 *
 * Return NaN:number if arguments includes invalid one.
 *
 * @param params
 */
export function sumOrNaN(...params: VariableArguments | SingleArrayArgument): BigNumber.Value | number {
  const useArray = Array.isArray(params[0]);
  const values = (useArray ? params[0] : params) as BigNumber.Value[];

  let sumv = new BigNumber(0);
  for (const v of values) {
    if (!new BigNumber(v).isEqualTo(v)) {
      return NaN;
    }
    sumv = sumv.plus(v);
  }

  return sumv;
}

/**
 * Get the sum value in arguments.
 *
 * Throw error if arguments includes invalid one.
 *
 * @param params
 */
export function sum(...params: VariableArguments | SingleArrayArgument): BigNumber.Value {
  const result = sumOrNaN(...params);
  if (!BigNumber.isBigNumber(result)) {
    throw new Error('Non numeric value passes');
  }

  return result;
}
