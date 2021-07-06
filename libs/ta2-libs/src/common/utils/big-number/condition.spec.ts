import { equal, gt, gte, isFiniteStrictly, isNegative, isPositive, isZero, lt, lte } from './condition';

describe('BigNumber Util Condition Functions', () => {
  describe('equal', () => {
    it('should handle value as expected', () => {
      expect(equal(1, 1)).toBe(1 === 1);
    });
    it('should throw error whenever non numeric value', () => {
      expect(() => equal(null as any, 1)).toThrow();
      expect(() => equal(NaN as any, 1)).toThrow();
    });
  });

  describe('gt', () => {
    it('should handle value as expected', () => {
      expect(gt(2, 1)).toBe(2 > 1);
    });
    it('should throw error whenever non numeric value', () => {
      expect(() => gt(null as any, 1)).toThrow();
    });
  });

  describe('lt', () => {
    it('should handle value as expected', () => {
      expect(lt(1, 2)).toBe(1 < 2);
    });
    it('should throw error whenever non numeric value', () => {
      expect(() => lt(null as any, 1)).toThrow();
    });
  });

  describe('gte', () => {
    it('should handle value as expected', () => {
      expect(gte(2, 1)).toBe(2 > 1);
    });
    it('should throw error whenever non numeric value', () => {
      expect(() => gte(null as any, 1)).toThrow();
    });
  });

  describe('lte', () => {
    it('should handle value as expected', () => {
      expect(lte(1, 2)).toBe(1 < 2);
    });
    it('should throw error whenever non numeric value', () => {
      expect(() => lte(null as any, 1)).toThrow();
    });
  });

  describe('isPositive', () => {
    it('should handle value as expected', () => {
      expect(isPositive(1)).toBe(0 < 1);
    });
    it('should throw error whenever non numeric value', () => {
      expect(() => isPositive(null as any)).toThrow();
    });
  });

  describe('isNegative', () => {
    it('should handle value as expected', () => {
      expect(isNegative(-1)).toBe(-1 < 0);
    });
    it('should throw error whenever non numeric value', () => {
      expect(() => isNegative(null as any)).toThrow();
    });
  });

  describe('isZero', () => {
    it('should handle value as expected', () => {
      expect(isZero(0)).toBe(0 === 0);
    });
    it('should throw error whenever non numeric value', () => {
      expect(() => isZero(null as any)).toThrow();
    });
  });

  describe('isFiniteStrictly', () => {
    it('should handle value as expected', () => {
      expect(isFiniteStrictly(1)).toBe(Number.isFinite(1));
    });
    it('should throw error whenever non numeric value', () => {
      expect(() => isFiniteStrictly(null as any)).toThrow();
    });
  });
});
