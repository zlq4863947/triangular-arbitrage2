import { NumericString } from '@broker-trade-application/models';

import { getBigNumber, getBigNumberStrictly } from './get-big-number';

describe('BigNumber internal util functions', () => {
  describe('getBigNumber', () => {
    it('should return fallback value.', () => {
      expect(getBigNumber(null!).toString()).toEqual('0' as NumericString);
      expect(getBigNumber(undefined!).toString()).toEqual('0' as NumericString);
      expect(getBigNumber('' as NumericString).toString()).toEqual('0' as NumericString);
      expect(getBigNumber(Infinity).toString()).toEqual('Infinity' as NumericString);
    });

    it('should return big number value.', () => {
      expect(getBigNumber(0).toString()).toEqual('0' as NumericString);
      expect(getBigNumber(0).toFixed(3)).toEqual('0.000' as NumericString);
      expect(getBigNumber('0' as NumericString).toString()).toEqual('0' as NumericString);
      expect(getBigNumber('0' as NumericString).toFixed(3)).toEqual('0.000' as NumericString);
      expect(getBigNumber(54.345).toString()).toEqual('54.345' as NumericString);
      expect(getBigNumber(54.345).toFixed(3)).toEqual('54.345' as NumericString);
      expect(getBigNumber('54.345' as NumericString).toString()).toEqual('54.345' as NumericString);
      expect(getBigNumber('54.345' as NumericString).toFixed(2)).toEqual('54.35' as NumericString);
      expect(getBigNumber(12.234567849423).toFixed(3)).toEqual('12.235' as NumericString);
      expect(getBigNumber(12.234567849423).toFixed(12)).toEqual('12.234567849423' as NumericString);
      expect(getBigNumber(12.2345678494233459).toString()).toBeTruthy();
    });
  });

  describe('getBigNumberSafely', () => {
    it('should return fallback value.', () => {
      expect(() => getBigNumberStrictly(null! as NumericString).toString()).toThrow();
      expect(() => getBigNumberStrictly(undefined! as NumericString).toString()).toThrow();
      expect(() => getBigNumberStrictly('' as NumericString).toString()).toThrow();
    });

    it('should return big number value.', () => {
      expect(getBigNumberStrictly(0).toString()).toEqual('0' as NumericString);
      expect(getBigNumberStrictly(0).toFixed(3)).toEqual('0.000' as NumericString);
      expect(getBigNumberStrictly('0' as NumericString).toString()).toEqual('0' as NumericString);
      expect(getBigNumberStrictly('0' as NumericString).toFixed(3)).toEqual('0.000' as NumericString);
      expect(getBigNumberStrictly(54.345).toString()).toEqual('54.345' as NumericString);
      expect(getBigNumberStrictly(54.345).toFixed(3)).toEqual('54.345' as NumericString);
      expect(getBigNumberStrictly('54.345' as NumericString).toString()).toEqual('54.345' as NumericString);
      expect(getBigNumberStrictly('54.345' as NumericString).toFixed(2)).toEqual('54.35' as NumericString);
      expect(getBigNumberStrictly(12.234567849423).toFixed(3)).toEqual('12.235' as NumericString);
      expect(getBigNumberStrictly(12.234567849423).toFixed(12)).toEqual('12.234567849423' as NumericString);
      expect(() => getBigNumberStrictly(12.2345678494233459).toString()).toThrow();
    });
  });
});
