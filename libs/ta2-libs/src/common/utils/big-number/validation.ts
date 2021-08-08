import { getBigNumberStrictly } from './get-big-number';

enum ErrorMessage {
  NotFinite = 'value is not finite number.',
  NotZero = 'value is not zero.',
  NotPositive = 'value is not positive number.',
  NotNegative = 'value is not negative number.',
  NotInteger = 'value is not integer.',
  NotGTEZero = 'value is not gte 0',
  NotLTEZero = 'value is not lte 0',
}

export function validateFiniteNumber(value: any): void {
  const bn = getBigNumberStrictly(value);
  if (!bn.isFinite()) {
    throw new Error(ErrorMessage.NotFinite);
  }
}

export function validateZero(value: any): void {
  const bn = getBigNumberStrictly(value);
  if (!bn.eq(0)) {
    throw new Error(ErrorMessage.NotZero);
  }
}

export function validatePositiveNumber(value: any): void {
  const bn = getBigNumberStrictly(value);
  if (!bn.gt(0)) {
    throw new Error(ErrorMessage.NotPositive);
  }
}

export function validateNegativeNumber(value: any): void {
  const bn = getBigNumberStrictly(value);
  if (!bn.lt(0)) {
    throw new Error(ErrorMessage.NotNegative);
  }
}

export function validatePositiveFiniteNumber(value: any): void {
  const bn = getBigNumberStrictly(value);
  if (!bn.isFinite()) {
    throw new Error(ErrorMessage.NotFinite);
  }
  if (!bn.gt(0)) {
    throw new Error(ErrorMessage.NotPositive);
  }
}

export function validateNegativeFiniteNumber(value: any): void {
  const bn = getBigNumberStrictly(value);
  if (!bn.isFinite()) {
    throw new Error(ErrorMessage.NotFinite);
  }
  if (!bn.lt(0)) {
    throw new Error(ErrorMessage.NotNegative);
  }
}

export function validatePositiveFiniteNumberOrZero(value: any): void {
  const bn = getBigNumberStrictly(value);
  if (!bn.isFinite()) {
    throw new Error(ErrorMessage.NotFinite);
  }
  if (!bn.gte(0)) {
    throw new Error(ErrorMessage.NotGTEZero);
  }
}

export function validateNegativeFiniteNumberOrZero(value: any): void {
  const bn = getBigNumberStrictly(value);
  if (!bn.isFinite()) {
    throw new Error(ErrorMessage.NotFinite);
  }
  if (!bn.lte(0)) {
    throw new Error(ErrorMessage.NotLTEZero);
  }
}

export function validateIntegerNumber(value: any): void {
  const bn = getBigNumberStrictly(value);
  if (!bn.isInteger()) {
    throw new Error(ErrorMessage.NotInteger);
  }
}

export function validatePositiveIntegerNumber(value: any): void {
  const bn = getBigNumberStrictly(value);
  if (!bn.isInteger()) {
    throw new Error(ErrorMessage.NotInteger);
  }
  if (!bn.gte(0)) {
    throw new Error(ErrorMessage.NotPositive);
  }
}

export function validateNegativeIntegerNumber(value: any): void {
  const bn = getBigNumberStrictly(value);
  if (!bn.isInteger()) {
    throw new Error(ErrorMessage.NotInteger);
  }
  if (!bn.lte(0)) {
    throw new Error(ErrorMessage.NotNegative);
  }
}
