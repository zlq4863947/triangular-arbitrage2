import { BigNumber } from 'bignumber.js';

export function getBigNumber(value: BigNumber.Value): BigNumber {
  let bn: BigNumber;

  try {
    bn = new BigNumber(value);
  } catch (e) {
    bn = new BigNumber(NaN);
  }

  return bn;
}

export function getBigNumberStrictly(value: BigNumber.Value): BigNumber {
  const bn = getBigNumber(value);

  if (bn.isNaN()) {
    throw new Error('value is not numeric.');
  }

  return bn;
}
