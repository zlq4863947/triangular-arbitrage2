import {
  validateFiniteNumber,
  validateIntegerNumber,
  validateNegativeFiniteNumber,
  validateNegativeFiniteNumberOrZero,
  validateNegativeIntegerNumber,
  validateNegativeNumber,
  validatePositiveFiniteNumber,
  validatePositiveFiniteNumberOrZero,
  validatePositiveIntegerNumber,
  validatePositiveNumber,
  validateZero,
} from './validation';

const positiveZero = 0;
const negativeZero = -0;
const positiveInteger = 1;
const negativeInteger = -1;
const positiveFloat = 0.1;
const negativeFloat = -0.1;
const positiveInfinity = Infinity;
const negativeInfinity = -Infinity;
const bigPositiveInteger = 100000000000000000000000000000000;
const bigNegativeInteger = -100000000000000000000000000000000;
const smallPositiveFloat = 0.0000000000000000000000000000001;
const smallNegativeFloat = -0.0000000000000000000000000000001;
const positiveZeroString = '0';
const negativeZeroString = '-0';
const positiveIntegerString = '1';
const negativeIntegerString = '-1';
const positiveFloatString = '0.1';
const negativeFloatString = '-0.1';
const positiveInfinityString = 'Infinity';
const negativeInfinityString = '-Infinity';
const bigPositiveIntegerString = '100000000000000000000000000000';
const bigNegativeIntegerString = '-100000000000000000000000000000';
const smallPositiveFloatString = '0.0000000000000000000000000000001';
const smallNegativeFloatString = '-0.0000000000000000000000000000001';

// Function to test that validators throw errors.
function getTester(fn: (v: any) => void, v: any): () => void {
  return () => fn(v);
}

describe('BigNumber Validation Functions', () => {
  describe('validateFiniteNumber', () => {
    it('should validate as expected', () => {
      expect(getTester(validateFiniteNumber, positiveZero)).not.toThrow();
      expect(getTester(validateFiniteNumber, negativeZero)).not.toThrow();
      expect(getTester(validateFiniteNumber, positiveInteger)).not.toThrow();
      expect(getTester(validateFiniteNumber, negativeInteger)).not.toThrow();
      expect(getTester(validateFiniteNumber, positiveFloat)).not.toThrow();
      expect(getTester(validateFiniteNumber, negativeFloat)).not.toThrow();
      expect(getTester(validateFiniteNumber, positiveInfinity)).toThrow();
      expect(getTester(validateFiniteNumber, negativeInfinity)).toThrow();
      expect(getTester(validateFiniteNumber, bigPositiveInteger)).not.toThrow();
      expect(getTester(validateFiniteNumber, bigNegativeInteger)).not.toThrow();
      expect(getTester(validateFiniteNumber, smallPositiveFloat)).not.toThrow();
      expect(getTester(validateFiniteNumber, smallNegativeFloat)).not.toThrow();
      expect(getTester(validateFiniteNumber, positiveZeroString)).not.toThrow();
      expect(getTester(validateFiniteNumber, negativeZeroString)).not.toThrow();
      expect(getTester(validateFiniteNumber, positiveIntegerString)).not.toThrow();
      expect(getTester(validateFiniteNumber, negativeIntegerString)).not.toThrow();
      expect(getTester(validateFiniteNumber, positiveFloatString)).not.toThrow();
      expect(getTester(validateFiniteNumber, negativeFloatString)).not.toThrow();
      expect(getTester(validateFiniteNumber, positiveInfinityString)).toThrow();
      expect(getTester(validateFiniteNumber, negativeInfinityString)).toThrow();
      expect(getTester(validateFiniteNumber, bigPositiveIntegerString)).not.toThrow();
      expect(getTester(validateFiniteNumber, bigNegativeIntegerString)).not.toThrow();
      expect(getTester(validateFiniteNumber, smallPositiveFloatString)).not.toThrow();
      expect(getTester(validateFiniteNumber, smallNegativeFloatString)).not.toThrow();
    });
  });

  describe('validateZero', () => {
    it('should validate as expected', () => {
      expect(getTester(validateZero, positiveZero)).not.toThrow();
      expect(getTester(validateZero, negativeZero)).not.toThrow();
      expect(getTester(validateZero, positiveInteger)).toThrow();
      expect(getTester(validateZero, negativeInteger)).toThrow();
      expect(getTester(validateZero, positiveFloat)).toThrow();
      expect(getTester(validateZero, negativeFloat)).toThrow();
      expect(getTester(validateZero, positiveInfinity)).toThrow();
      expect(getTester(validateZero, negativeInfinity)).toThrow();
      expect(getTester(validateZero, bigPositiveInteger)).toThrow();
      expect(getTester(validateZero, bigNegativeInteger)).toThrow();
      expect(getTester(validateZero, smallPositiveFloat)).toThrow();
      expect(getTester(validateZero, smallNegativeFloat)).toThrow();
      expect(getTester(validateZero, positiveZeroString)).not.toThrow();
      expect(getTester(validateZero, negativeZeroString)).not.toThrow();
      expect(getTester(validateZero, positiveIntegerString)).toThrow();
      expect(getTester(validateZero, negativeIntegerString)).toThrow();
      expect(getTester(validateZero, positiveFloatString)).toThrow();
      expect(getTester(validateZero, negativeFloatString)).toThrow();
      expect(getTester(validateZero, positiveInfinityString)).toThrow();
      expect(getTester(validateZero, negativeInfinityString)).toThrow();
      expect(getTester(validateZero, bigPositiveIntegerString)).toThrow();
      expect(getTester(validateZero, bigNegativeIntegerString)).toThrow();
      expect(getTester(validateZero, smallPositiveFloatString)).toThrow();
      expect(getTester(validateZero, smallNegativeFloatString)).toThrow();
    });
  });

  describe('validatePositiveNumber', () => {
    it('should validate as expected', () => {
      expect(getTester(validatePositiveNumber, positiveZero)).toThrow();
      expect(getTester(validatePositiveNumber, negativeZero)).toThrow();
      expect(getTester(validatePositiveNumber, positiveInteger)).not.toThrow();
      expect(getTester(validatePositiveNumber, negativeInteger)).toThrow();
      expect(getTester(validatePositiveNumber, positiveFloat)).not.toThrow();
      expect(getTester(validatePositiveNumber, negativeFloat)).toThrow();
      expect(getTester(validatePositiveNumber, positiveInfinity)).not.toThrow();
      expect(getTester(validatePositiveNumber, negativeInfinity)).toThrow();
      expect(getTester(validatePositiveNumber, bigPositiveInteger)).not.toThrow();
      expect(getTester(validatePositiveNumber, bigNegativeInteger)).toThrow();
      expect(getTester(validatePositiveNumber, smallPositiveFloat)).not.toThrow();
      expect(getTester(validatePositiveNumber, smallNegativeFloat)).toThrow();
      expect(getTester(validatePositiveNumber, positiveZeroString)).toThrow();
      expect(getTester(validatePositiveNumber, negativeZeroString)).toThrow();
      expect(getTester(validatePositiveNumber, positiveIntegerString)).not.toThrow();
      expect(getTester(validatePositiveNumber, negativeIntegerString)).toThrow();
      expect(getTester(validatePositiveNumber, positiveFloatString)).not.toThrow();
      expect(getTester(validatePositiveNumber, negativeFloatString)).toThrow();
      expect(getTester(validatePositiveNumber, positiveInfinityString)).not.toThrow();
      expect(getTester(validatePositiveNumber, negativeInfinityString)).toThrow();
      expect(getTester(validatePositiveNumber, bigPositiveIntegerString)).not.toThrow();
      expect(getTester(validatePositiveNumber, bigNegativeIntegerString)).toThrow();
      expect(getTester(validatePositiveNumber, smallPositiveFloatString)).not.toThrow();
      expect(getTester(validatePositiveNumber, smallNegativeFloatString)).toThrow();
    });
  });

  describe('validateNegativeNumber', () => {
    it('should validate as expected', () => {
      expect(getTester(validateNegativeNumber, positiveZero)).toThrow();
      expect(getTester(validateNegativeNumber, negativeZero)).toThrow();
      expect(getTester(validateNegativeNumber, positiveInteger)).toThrow();
      expect(getTester(validateNegativeNumber, negativeInteger)).not.toThrow();
      expect(getTester(validateNegativeNumber, positiveFloat)).toThrow();
      expect(getTester(validateNegativeNumber, negativeFloat)).not.toThrow();
      expect(getTester(validateNegativeNumber, positiveInfinity)).toThrow();
      expect(getTester(validateNegativeNumber, negativeInfinity)).not.toThrow();
      expect(getTester(validateNegativeNumber, bigPositiveInteger)).toThrow();
      expect(getTester(validateNegativeNumber, bigNegativeInteger)).not.toThrow();
      expect(getTester(validateNegativeNumber, smallPositiveFloat)).toThrow();
      expect(getTester(validateNegativeNumber, smallNegativeFloat)).not.toThrow();
      expect(getTester(validateNegativeNumber, positiveZeroString)).toThrow();
      expect(getTester(validateNegativeNumber, negativeZeroString)).toThrow();
      expect(getTester(validateNegativeNumber, positiveIntegerString)).toThrow();
      expect(getTester(validateNegativeNumber, negativeIntegerString)).not.toThrow();
      expect(getTester(validateNegativeNumber, positiveFloatString)).toThrow();
      expect(getTester(validateNegativeNumber, negativeFloatString)).not.toThrow();
      expect(getTester(validateNegativeNumber, positiveInfinityString)).toThrow();
      expect(getTester(validateNegativeNumber, negativeInfinityString)).not.toThrow();
      expect(getTester(validateNegativeNumber, bigPositiveIntegerString)).toThrow();
      expect(getTester(validateNegativeNumber, bigNegativeIntegerString)).not.toThrow();
      expect(getTester(validateNegativeNumber, smallPositiveFloatString)).toThrow();
      expect(getTester(validateNegativeNumber, smallNegativeFloatString)).not.toThrow();
    });
  });

  describe('validatePositiveFiniteNumber', () => {
    it('should validate as expected', () => {
      expect(getTester(validatePositiveFiniteNumber, positiveZero)).toThrow();
      expect(getTester(validatePositiveFiniteNumber, negativeZero)).toThrow();
      expect(getTester(validatePositiveFiniteNumber, positiveInteger)).not.toThrow();
      expect(getTester(validatePositiveFiniteNumber, negativeInteger)).toThrow();
      expect(getTester(validatePositiveFiniteNumber, positiveFloat)).not.toThrow();
      expect(getTester(validatePositiveFiniteNumber, negativeFloat)).toThrow();
      expect(getTester(validatePositiveFiniteNumber, positiveInfinity)).toThrow();
      expect(getTester(validatePositiveFiniteNumber, negativeInfinity)).toThrow();
      expect(getTester(validatePositiveFiniteNumber, bigPositiveInteger)).not.toThrow();
      expect(getTester(validatePositiveFiniteNumber, bigNegativeInteger)).toThrow();
      expect(getTester(validatePositiveFiniteNumber, smallPositiveFloat)).not.toThrow();
      expect(getTester(validatePositiveFiniteNumber, smallNegativeFloat)).toThrow();
      expect(getTester(validatePositiveFiniteNumber, positiveZeroString)).toThrow();
      expect(getTester(validatePositiveFiniteNumber, negativeZeroString)).toThrow();
      expect(getTester(validatePositiveFiniteNumber, positiveIntegerString)).not.toThrow();
      expect(getTester(validatePositiveFiniteNumber, negativeIntegerString)).toThrow();
      expect(getTester(validatePositiveFiniteNumber, positiveFloatString)).not.toThrow();
      expect(getTester(validatePositiveFiniteNumber, negativeFloatString)).toThrow();
      expect(getTester(validatePositiveFiniteNumber, positiveInfinityString)).toThrow();
      expect(getTester(validatePositiveFiniteNumber, negativeInfinityString)).toThrow();
      expect(getTester(validatePositiveFiniteNumber, bigPositiveIntegerString)).not.toThrow();
      expect(getTester(validatePositiveFiniteNumber, bigNegativeIntegerString)).toThrow();
      expect(getTester(validatePositiveFiniteNumber, smallPositiveFloatString)).not.toThrow();
      expect(getTester(validatePositiveFiniteNumber, smallNegativeFloatString)).toThrow();
    });
  });

  describe('validateNegativeFiniteNumber', () => {
    it('should validate as expected', () => {
      expect(getTester(validateNegativeFiniteNumber, positiveZero)).toThrow();
      expect(getTester(validateNegativeFiniteNumber, negativeZero)).toThrow();
      expect(getTester(validateNegativeFiniteNumber, positiveInteger)).toThrow();
      expect(getTester(validateNegativeFiniteNumber, negativeInteger)).not.toThrow();
      expect(getTester(validateNegativeFiniteNumber, positiveFloat)).toThrow();
      expect(getTester(validateNegativeFiniteNumber, negativeFloat)).not.toThrow();
      expect(getTester(validateNegativeFiniteNumber, positiveInfinity)).toThrow();
      expect(getTester(validateNegativeFiniteNumber, negativeInfinity)).toThrow();
      expect(getTester(validateNegativeFiniteNumber, bigPositiveInteger)).toThrow();
      expect(getTester(validateNegativeFiniteNumber, bigNegativeInteger)).not.toThrow();
      expect(getTester(validateNegativeFiniteNumber, smallPositiveFloat)).toThrow();
      expect(getTester(validateNegativeFiniteNumber, smallNegativeFloat)).not.toThrow();
      expect(getTester(validateNegativeFiniteNumber, positiveZeroString)).toThrow();
      expect(getTester(validateNegativeFiniteNumber, negativeZeroString)).toThrow();
      expect(getTester(validateNegativeFiniteNumber, positiveIntegerString)).toThrow();
      expect(getTester(validateNegativeFiniteNumber, negativeIntegerString)).not.toThrow();
      expect(getTester(validateNegativeFiniteNumber, positiveFloatString)).toThrow();
      expect(getTester(validateNegativeFiniteNumber, negativeFloatString)).not.toThrow();
      expect(getTester(validateNegativeFiniteNumber, positiveInfinityString)).toThrow();
      expect(getTester(validateNegativeFiniteNumber, negativeInfinityString)).toThrow();
      expect(getTester(validateNegativeFiniteNumber, bigPositiveIntegerString)).toThrow();
      expect(getTester(validateNegativeFiniteNumber, bigNegativeIntegerString)).not.toThrow();
      expect(getTester(validateNegativeFiniteNumber, smallPositiveFloatString)).toThrow();
      expect(getTester(validateNegativeFiniteNumber, smallNegativeFloatString)).not.toThrow();
    });
  });

  describe('validatePositiveFiniteNumberOrZero', () => {
    it('should validate as expected', () => {
      expect(getTester(validatePositiveFiniteNumberOrZero, positiveZero)).not.toThrow();
      expect(getTester(validatePositiveFiniteNumberOrZero, negativeZero)).not.toThrow();
      expect(getTester(validatePositiveFiniteNumberOrZero, positiveInteger)).not.toThrow();
      expect(getTester(validatePositiveFiniteNumberOrZero, negativeInteger)).toThrow();
      expect(getTester(validatePositiveFiniteNumberOrZero, positiveFloat)).not.toThrow();
      expect(getTester(validatePositiveFiniteNumberOrZero, negativeFloat)).toThrow();
      expect(getTester(validatePositiveFiniteNumberOrZero, positiveInfinity)).toThrow();
      expect(getTester(validatePositiveFiniteNumberOrZero, negativeInfinity)).toThrow();
      expect(getTester(validatePositiveFiniteNumberOrZero, bigPositiveInteger)).not.toThrow();
      expect(getTester(validatePositiveFiniteNumberOrZero, bigNegativeInteger)).toThrow();
      expect(getTester(validatePositiveFiniteNumberOrZero, smallPositiveFloat)).not.toThrow();
      expect(getTester(validatePositiveFiniteNumberOrZero, smallNegativeFloat)).toThrow();
      expect(getTester(validatePositiveFiniteNumberOrZero, positiveZeroString)).not.toThrow();
      expect(getTester(validatePositiveFiniteNumberOrZero, negativeZeroString)).not.toThrow();
      expect(getTester(validatePositiveFiniteNumberOrZero, positiveIntegerString)).not.toThrow();
      expect(getTester(validatePositiveFiniteNumberOrZero, negativeIntegerString)).toThrow();
      expect(getTester(validatePositiveFiniteNumberOrZero, positiveFloatString)).not.toThrow();
      expect(getTester(validatePositiveFiniteNumberOrZero, negativeFloatString)).toThrow();
      expect(getTester(validatePositiveFiniteNumberOrZero, positiveInfinityString)).toThrow();
      expect(getTester(validatePositiveFiniteNumberOrZero, negativeInfinityString)).toThrow();
      expect(getTester(validatePositiveFiniteNumberOrZero, bigPositiveIntegerString)).not.toThrow();
      expect(getTester(validatePositiveFiniteNumberOrZero, bigNegativeIntegerString)).toThrow();
      expect(getTester(validatePositiveFiniteNumberOrZero, smallPositiveFloatString)).not.toThrow();
      expect(getTester(validatePositiveFiniteNumberOrZero, smallNegativeFloatString)).toThrow();
    });
  });

  describe('validateNegativeFiniteNumberOrZero', () => {
    it('should validate as expected', () => {
      expect(getTester(validateNegativeFiniteNumberOrZero, positiveZero)).not.toThrow();
      expect(getTester(validateNegativeFiniteNumberOrZero, negativeZero)).not.toThrow();
      expect(getTester(validateNegativeFiniteNumberOrZero, positiveInteger)).toThrow();
      expect(getTester(validateNegativeFiniteNumberOrZero, negativeInteger)).not.toThrow();
      expect(getTester(validateNegativeFiniteNumberOrZero, positiveFloat)).toThrow();
      expect(getTester(validateNegativeFiniteNumberOrZero, negativeFloat)).not.toThrow();
      expect(getTester(validateNegativeFiniteNumberOrZero, positiveInfinity)).toThrow();
      expect(getTester(validateNegativeFiniteNumberOrZero, negativeInfinity)).toThrow();
      expect(getTester(validateNegativeFiniteNumberOrZero, bigPositiveInteger)).toThrow();
      expect(getTester(validateNegativeFiniteNumberOrZero, bigNegativeInteger)).not.toThrow();
      expect(getTester(validateNegativeFiniteNumberOrZero, smallPositiveFloat)).toThrow();
      expect(getTester(validateNegativeFiniteNumberOrZero, smallNegativeFloat)).not.toThrow();
      expect(getTester(validateNegativeFiniteNumberOrZero, positiveZeroString)).not.toThrow();
      expect(getTester(validateNegativeFiniteNumberOrZero, negativeZeroString)).not.toThrow();
      expect(getTester(validateNegativeFiniteNumberOrZero, positiveIntegerString)).toThrow();
      expect(getTester(validateNegativeFiniteNumberOrZero, negativeIntegerString)).not.toThrow();
      expect(getTester(validateNegativeFiniteNumberOrZero, positiveFloatString)).toThrow();
      expect(getTester(validateNegativeFiniteNumberOrZero, negativeFloatString)).not.toThrow();
      expect(getTester(validateNegativeFiniteNumberOrZero, positiveInfinityString)).toThrow();
      expect(getTester(validateNegativeFiniteNumberOrZero, negativeInfinityString)).toThrow();
      expect(getTester(validateNegativeFiniteNumberOrZero, bigPositiveIntegerString)).toThrow();
      expect(getTester(validateNegativeFiniteNumberOrZero, bigNegativeIntegerString)).not.toThrow();
      expect(getTester(validateNegativeFiniteNumberOrZero, smallPositiveFloatString)).toThrow();
      expect(getTester(validateNegativeFiniteNumberOrZero, smallNegativeFloatString)).not.toThrow();
    });
  });

  describe('validateIntegerNumber', () => {
    it('should validate as expected', () => {
      expect(getTester(validateIntegerNumber, positiveZero)).not.toThrow();
      expect(getTester(validateIntegerNumber, negativeZero)).not.toThrow();
      expect(getTester(validateIntegerNumber, positiveInteger)).not.toThrow();
      expect(getTester(validateIntegerNumber, negativeInteger)).not.toThrow();
      expect(getTester(validateIntegerNumber, positiveFloat)).toThrow();
      expect(getTester(validateIntegerNumber, negativeFloat)).toThrow();
      expect(getTester(validateIntegerNumber, positiveInfinity)).toThrow();
      expect(getTester(validateIntegerNumber, negativeInfinity)).toThrow();
      expect(getTester(validateIntegerNumber, bigPositiveInteger)).not.toThrow();
      expect(getTester(validateIntegerNumber, bigNegativeInteger)).not.toThrow();
      expect(getTester(validateIntegerNumber, smallPositiveFloat)).toThrow();
      expect(getTester(validateIntegerNumber, smallNegativeFloat)).toThrow();
      expect(getTester(validateIntegerNumber, positiveZeroString)).not.toThrow();
      expect(getTester(validateIntegerNumber, negativeZeroString)).not.toThrow();
      expect(getTester(validateIntegerNumber, positiveIntegerString)).not.toThrow();
      expect(getTester(validateIntegerNumber, negativeIntegerString)).not.toThrow();
      expect(getTester(validateIntegerNumber, positiveFloatString)).toThrow();
      expect(getTester(validateIntegerNumber, negativeFloatString)).toThrow();
      expect(getTester(validateIntegerNumber, positiveInfinityString)).toThrow();
      expect(getTester(validateIntegerNumber, negativeInfinityString)).toThrow();
      expect(getTester(validateIntegerNumber, bigPositiveIntegerString)).not.toThrow();
      expect(getTester(validateIntegerNumber, bigNegativeIntegerString)).not.toThrow();
      expect(getTester(validateIntegerNumber, smallPositiveFloatString)).toThrow();
      expect(getTester(validateIntegerNumber, smallNegativeFloatString)).toThrow();
    });
  });

  describe('validatePositiveIntegerNumber', () => {
    it('should validate as expected', () => {
      expect(getTester(validatePositiveIntegerNumber, positiveZero)).not.toThrow();
      expect(getTester(validatePositiveIntegerNumber, negativeZero)).not.toThrow();
      expect(getTester(validatePositiveIntegerNumber, positiveInteger)).not.toThrow();
      expect(getTester(validatePositiveIntegerNumber, negativeInteger)).toThrow();
      expect(getTester(validatePositiveIntegerNumber, positiveFloat)).toThrow();
      expect(getTester(validatePositiveIntegerNumber, negativeFloat)).toThrow();
      expect(getTester(validatePositiveIntegerNumber, positiveInfinity)).toThrow();
      expect(getTester(validatePositiveIntegerNumber, negativeInfinity)).toThrow();
      expect(getTester(validatePositiveIntegerNumber, bigPositiveInteger)).not.toThrow();
      expect(getTester(validatePositiveIntegerNumber, bigNegativeInteger)).toThrow();
      expect(getTester(validatePositiveIntegerNumber, smallPositiveFloat)).toThrow();
      expect(getTester(validatePositiveIntegerNumber, smallNegativeFloat)).toThrow();
      expect(getTester(validatePositiveIntegerNumber, positiveZeroString)).not.toThrow();
      expect(getTester(validatePositiveIntegerNumber, negativeZeroString)).not.toThrow();
      expect(getTester(validatePositiveIntegerNumber, positiveIntegerString)).not.toThrow();
      expect(getTester(validatePositiveIntegerNumber, negativeIntegerString)).toThrow();
      expect(getTester(validatePositiveIntegerNumber, positiveFloatString)).toThrow();
      expect(getTester(validatePositiveIntegerNumber, negativeFloatString)).toThrow();
      expect(getTester(validatePositiveIntegerNumber, positiveInfinityString)).toThrow();
      expect(getTester(validatePositiveIntegerNumber, negativeInfinityString)).toThrow();
      expect(getTester(validatePositiveIntegerNumber, bigPositiveIntegerString)).not.toThrow();
      expect(getTester(validatePositiveIntegerNumber, bigNegativeIntegerString)).toThrow();
      expect(getTester(validatePositiveIntegerNumber, smallPositiveFloatString)).toThrow();
      expect(getTester(validatePositiveIntegerNumber, smallNegativeFloatString)).toThrow();
    });
  });

  describe('validateNegativeIntegerNumber', () => {
    it('should validate as expected', () => {
      expect(getTester(validateNegativeIntegerNumber, positiveZero)).not.toThrow();
      expect(getTester(validateNegativeIntegerNumber, negativeZero)).not.toThrow();
      expect(getTester(validateNegativeIntegerNumber, positiveInteger)).toThrow();
      expect(getTester(validateNegativeIntegerNumber, negativeInteger)).not.toThrow();
      expect(getTester(validateNegativeIntegerNumber, positiveFloat)).toThrow();
      expect(getTester(validateNegativeIntegerNumber, negativeFloat)).toThrow();
      expect(getTester(validateNegativeIntegerNumber, positiveInfinity)).toThrow();
      expect(getTester(validateNegativeIntegerNumber, negativeInfinity)).toThrow();
      expect(getTester(validateNegativeIntegerNumber, bigPositiveInteger)).toThrow();
      expect(getTester(validateNegativeIntegerNumber, bigNegativeInteger)).not.toThrow();
      expect(getTester(validateNegativeIntegerNumber, smallPositiveFloat)).toThrow();
      expect(getTester(validateNegativeIntegerNumber, smallNegativeFloat)).toThrow();
      expect(getTester(validateNegativeIntegerNumber, positiveZeroString)).not.toThrow();
      expect(getTester(validateNegativeIntegerNumber, negativeZeroString)).not.toThrow();
      expect(getTester(validateNegativeIntegerNumber, positiveIntegerString)).toThrow();
      expect(getTester(validateNegativeIntegerNumber, negativeIntegerString)).not.toThrow();
      expect(getTester(validateNegativeIntegerNumber, positiveFloatString)).toThrow();
      expect(getTester(validateNegativeIntegerNumber, negativeFloatString)).toThrow();
      expect(getTester(validateNegativeIntegerNumber, positiveInfinityString)).toThrow();
      expect(getTester(validateNegativeIntegerNumber, negativeInfinityString)).toThrow();
      expect(getTester(validateNegativeIntegerNumber, bigPositiveIntegerString)).toThrow();
      expect(getTester(validateNegativeIntegerNumber, bigNegativeIntegerString)).not.toThrow();
      expect(getTester(validateNegativeIntegerNumber, smallPositiveFloatString)).toThrow();
      expect(getTester(validateNegativeIntegerNumber, smallNegativeFloatString)).toThrow();
    });
  });
});
