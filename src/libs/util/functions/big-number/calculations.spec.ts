import { BigNumber } from 'bignumber.js';

import { addToString, divideToString, multipleToString, oppositeToString, subtractToString } from './calculations';

describe('BigNumber util functions', () => {
  describe('addToString', () => {
    it('should return expected value.', () => {
      expect(addToString(1, 2)).toEqual('3');
      expect(addToString('1', '2')).toEqual('3');
      expect(addToString(new BigNumber(1), new BigNumber(2))).toEqual('3');
    });

    it('should throw if invalid value', () => {
      expect(() => addToString(null as any, null as any)).toThrow();
      expect(() => addToString(undefined as any, undefined as any)).toThrow();
      expect(() => addToString('', '')).toThrow();
    });
  });

  describe('subtractToString', () => {
    it('should return expected value.', () => {
      expect(subtractToString(1, 2)).toEqual('-1');
      expect(subtractToString('1', '2')).toEqual('-1');
      expect(subtractToString(new BigNumber(1), new BigNumber(2))).toEqual('-1');
    });

    it('should throw if invalid value', () => {
      expect(() => subtractToString(null as any, null as any)).toThrow();
      expect(() => subtractToString(undefined as any, undefined as any)).toThrow();
      expect(() => subtractToString('', '')).toThrow();
    });
  });

  describe('multipleToString', () => {
    it('should return expected value.', () => {
      expect(multipleToString(1, 2)).toEqual('2');
      expect(multipleToString('1', '2')).toEqual('2');
      expect(multipleToString(new BigNumber(1), new BigNumber(2))).toEqual('2');
    });

    it('should throw if invalid value', () => {
      expect(() => multipleToString(null as any, null as any)).toThrow();
      expect(() => multipleToString(undefined as any, undefined as any)).toThrow();
      expect(() => multipleToString('', '')).toThrow();
    });
  });

  describe('divideToString', () => {
    it('should return expected value.', () => {
      expect(divideToString(1, 2)).toEqual('0.5');
      expect(divideToString('1', '2')).toEqual('0.5');
      expect(divideToString(new BigNumber(1), new BigNumber(2))).toEqual('0.5');
    });

    it('should throw if invalid value', () => {
      expect(() => divideToString(null as any, null as any)).toThrow();
      expect(() => divideToString(undefined as any, undefined as any)).toThrow();
      expect(() => divideToString('', '')).toThrow();
    });
  });

  describe('oppositeToString', () => {
    it('should return expected value.', () => {
      expect(oppositeToString(1)).toEqual('-1');
      expect(oppositeToString(-1)).toEqual('1');
      expect(oppositeToString('1')).toEqual('-1');
      expect(oppositeToString('-1')).toEqual('1');
      expect(oppositeToString(new BigNumber(1))).toEqual('-1');
      expect(oppositeToString(new BigNumber(-1))).toEqual('1');
    });

    it('should throw if invalid value', () => {
      expect(() => oppositeToString(null as any)).toThrow();
      expect(() => oppositeToString(undefined as any)).toThrow();
      expect(() => oppositeToString('')).toThrow();
    });
  });
});
