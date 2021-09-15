import { BigNumber } from 'bignumber.js';

import { getBigNumber, getBigNumberStrictly } from './get-big-number';

describe('BigNumber Util Functions', () => {
  describe('getBigNumber', () => {
    it('should return instance for acceptable values', () => {
      expect(getBigNumber(0).toNumber()).toBe(0);
      expect(getBigNumber(-0).toNumber()).toBe(-0);
      expect(getBigNumber(1).toNumber()).toBe(1);
      expect(getBigNumber(-1).toNumber()).toBe(-1);
      expect(getBigNumber(10000000000000000000000).toNumber()).toBe(10000000000000000000000);
      expect(getBigNumber(-10000000000000000000000).toNumber()).toBe(-10000000000000000000000);
      expect(getBigNumber(0.000000000000000000001).toNumber()).toBe(0.000000000000000000001);
      expect(getBigNumber(-0.000000000000000000001).toNumber()).toBe(-0.000000000000000000001);
      expect(getBigNumber(Infinity).toNumber()).toBe(Infinity);
      expect(getBigNumber(-Infinity).toNumber()).toBe(-Infinity);

      expect(getBigNumber('0').toString()).toBe('0');
      expect(getBigNumber('-0').toString()).toBe('0');
      expect(getBigNumber('1').toString()).toBe('1');
      expect(getBigNumber('-1').toString()).toBe('-1');
      expect(getBigNumber('10000000000000000000000').toString()).toBe('1e+22');
      expect(getBigNumber('-10000000000000000000000').toString()).toBe('-1e+22');
      expect(getBigNumber('0.000000000000000000001').toString()).toBe('1e-21');
      expect(getBigNumber('-0.000000000000000000001').toString()).toBe('-1e-21');
      expect(getBigNumber('Infinity').toString()).toBe('Infinity');
      expect(getBigNumber('-Infinity').toString()).toBe('-Infinity');

      expect(getBigNumber(new BigNumber('0')).toString()).toBe('0');
      expect(getBigNumber(new BigNumber(getBigNumber('-0'))).toString()).toBe('0');
      expect(getBigNumber(new BigNumber(getBigNumber('1'))).toString()).toBe('1');
      expect(getBigNumber(new BigNumber(getBigNumber('-1'))).toString()).toBe('-1');
      expect(getBigNumber(new BigNumber(getBigNumber('10000000000000000000000'))).toString()).toBe('1e+22');
      expect(getBigNumber(new BigNumber(getBigNumber('-10000000000000000000000'))).toString()).toBe('-1e+22');
      expect(getBigNumber(new BigNumber(getBigNumber('0.000000000000000000001'))).toString()).toBe('1e-21');
      expect(getBigNumber(new BigNumber(getBigNumber('-0.000000000000000000001'))).toString()).toBe('-1e-21');
      expect(getBigNumber(new BigNumber(getBigNumber('Infinity'))).toString()).toBe('Infinity');
      expect(getBigNumber(new BigNumber(getBigNumber('-Infinity'))).toString()).toBe('-Infinity');
    });

    it('should return instance for unacceptable values.', () => {
      expect(getBigNumber('').toNumber()).toEqual(NaN);
      expect(getBigNumber('string').toNumber()).toEqual(NaN);
      expect(getBigNumber(null as any).toNumber()).toEqual(NaN);
      expect(getBigNumber(undefined as any).toNumber()).toEqual(NaN);
      expect(getBigNumber([] as any).toNumber()).toEqual(NaN);
      expect(getBigNumber({} as any).toNumber()).toEqual(NaN);
    });
  });

  describe('getBigNumberSafely', () => {
    it('should not throw error when acceptable value', () => {
      expect(() => getBigNumberStrictly(0)).not.toThrow();
      expect(() => getBigNumberStrictly(-0)).not.toThrow();
      expect(() => getBigNumberStrictly(1)).not.toThrow();
      expect(() => getBigNumberStrictly(-1)).not.toThrow();
      expect(() => getBigNumberStrictly(10000000000000000000000)).not.toThrow();
      expect(() => getBigNumberStrictly(-10000000000000000000000)).not.toThrow();
      expect(() => getBigNumberStrictly(0.000000000000000000001)).not.toThrow();
      expect(() => getBigNumberStrictly(-0.000000000000000000001)).not.toThrow();
      expect(() => getBigNumberStrictly(Infinity)).not.toThrow();
      expect(() => getBigNumberStrictly(-Infinity)).not.toThrow();

      expect(() => getBigNumberStrictly('0')).not.toThrow();
      expect(() => getBigNumberStrictly('-0')).not.toThrow();
      expect(() => getBigNumberStrictly('1')).not.toThrow();
      expect(() => getBigNumberStrictly('-1')).not.toThrow();
      expect(() => getBigNumberStrictly('10000000000000000000000')).not.toThrow();
      expect(() => getBigNumberStrictly('-10000000000000000000000')).not.toThrow();
      expect(() => getBigNumberStrictly('0.000000000000000000001')).not.toThrow();
      expect(() => getBigNumberStrictly('-0.000000000000000000001')).not.toThrow();
      expect(() => getBigNumberStrictly('Infinity')).not.toThrow();
      expect(() => getBigNumberStrictly('-Infinity')).not.toThrow();

      expect(() => getBigNumberStrictly(new BigNumber(getBigNumberStrictly('0')))).not.toThrow();
      expect(() => getBigNumberStrictly(new BigNumber(getBigNumberStrictly('-0')))).not.toThrow();
      expect(() => getBigNumberStrictly(new BigNumber(getBigNumberStrictly('1')))).not.toThrow();
      expect(() => getBigNumberStrictly(new BigNumber(getBigNumberStrictly('-1')))).not.toThrow();
      expect(() => getBigNumberStrictly(new BigNumber(getBigNumberStrictly('10000000000000000000000')))).not.toThrow();
      expect(() => getBigNumberStrictly(new BigNumber(getBigNumberStrictly('-10000000000000000000000')))).not.toThrow();
      expect(() => getBigNumberStrictly(new BigNumber(getBigNumberStrictly('0.000000000000000000001')))).not.toThrow();
      expect(() => getBigNumberStrictly(new BigNumber(getBigNumberStrictly('-0.000000000000000000001')))).not.toThrow();
      expect(() => getBigNumberStrictly(new BigNumber(getBigNumberStrictly('Infinity')))).not.toThrow();
      expect(() => getBigNumberStrictly(new BigNumber(getBigNumberStrictly('-Infinity')))).not.toThrow();
    });

    it('should throw error when unacceptable value', () => {
      expect(() => getBigNumberStrictly('')).toThrow();
      expect(() => getBigNumberStrictly('string')).toThrow();
      expect(() => getBigNumberStrictly(null as any)).toThrow();
      expect(() => getBigNumberStrictly(undefined as any)).toThrow();
      expect(() => getBigNumberStrictly([] as any)).toThrow();
      expect(() => getBigNumberStrictly({} as any)).toThrow();
    });
  });
});
