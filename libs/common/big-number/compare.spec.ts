import BigNumber from 'bignumber.js';

import { max, min, sum } from './compare';

describe('BigNumber Util Compare Functions', () => {
  describe('max', () => {
    describe('When valid arguments', () => {
      describe('When use variable arguments', () => {
        it('should handle values as expected', () => {
          expect(max(1, 2, 3)).toBe(3);
          expect(max(1, 2, '3')).toBe('3');
        });
      });

      describe('When use single array argument', () => {
        it('should handle values as expected', () => {
          expect(max([1, 2, 3])).toBe(3);
          expect(max([1, 2, '3'])).toBe('3');
        });
      });
    });

    describe('When invalid arguments', () => {
      it('should throw error', () => {
        expect(() => max('', 2, 3)).toThrow();
        expect(() => max(null as any, 2, 3)).toThrow();
        expect(() => max(undefined as any, 2, 3)).toThrow();
        expect(() => max(1, 2, NaN as any)).toThrow();
      });
    });
  });

  describe('min', () => {
    describe('When valid arguments', () => {
      describe('When use variable arguments', () => {
        it('should handle values as expected', () => {
          expect(min(1, 2, 3)).toBe(1);
          expect(min('1', 2, 3)).toBe('1');
        });
      });

      describe('When use single array argument', () => {
        it('should handle values as expected', () => {
          expect(min([1, 2, 3])).toBe(1);
          expect(min(['1', 2, 3])).toBe('1');
        });
      });
    });

    describe('When invalid arguments', () => {
      it('should throw error', () => {
        expect(() => min('', 2, 3)).toThrow();
        expect(() => min(null as any, 2, 3)).toThrow();
        expect(() => min(undefined as any, 2, 3)).toThrow();
        expect(() => min(1, 2, NaN as any)).toThrow();
      });
    });
  });

  describe('sum', () => {
    describe('When valid arguments', () => {
      describe('When use variable arguments', () => {
        it('should handle values as expected', () => {
          expect(sum(1, 2, 3)).toEqual(new BigNumber('6'));
          expect(sum('1', 2, 3)).toEqual(new BigNumber('6'));
        });
      });

      describe('When use single array argument', () => {
        it('should handle values as expected', () => {
          expect(sum([1, 2, 3])).toEqual(new BigNumber('6'));
          expect(sum(['1', 2, 3])).toEqual(new BigNumber('6'));
        });
      });
    });

    describe('When invalid arguments', () => {
      it('should throw error', () => {
        expect(() => sum('', 2, 3)).toThrow();
        expect(() => sum(null as any, 2, 3)).toThrow();
        expect(() => sum(undefined as any, 2, 3)).toThrow();
        expect(() => sum(1, 2, NaN as any)).toThrow();
      });
    });
  });
});
