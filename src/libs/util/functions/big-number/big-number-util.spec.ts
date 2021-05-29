import { NumericString } from '@broker-trade-application/models';
import { BigNumber } from 'bignumber.js';

import {
  add,
  addStrictly,
  divide,
  divideStrictly,
  floorByDigit,
  formatComma,
  multiple,
  multipleStrictly,
  pow,
  subtract,
  subtractStrictly,
} from './big-number-util';

describe('BigNumber util functions', () => {
  describe('add', () => {
    it('should return fallback value.', () => {
      expect(add(null! as NumericString, null! as NumericString)).toEqual(0);
      expect(add(undefined! as NumericString, undefined! as NumericString)).toEqual(0);
      expect(add('' as NumericString, '' as NumericString)).toEqual(0);
      expect(add(NaN, NaN)).toEqual(NaN);
    });

    it('should return correct value.', () => {
      expect(add(1, 2)).toEqual(3);
      expect(add('1' as NumericString, '2' as NumericString)).toEqual(3);
      expect(add(new BigNumber(1), new BigNumber(2))).toEqual(3);
      expect(add(123.2145, 52.0148)).toEqual(175.2293);
      expect(add('123.2145' as NumericString, '52.0148' as NumericString)).toEqual(175.2293);
      expect(add(Infinity, 1)).toEqual(Infinity);
    });
  });

  describe('subtract', () => {
    it('should return fallback value.', () => {
      expect(subtract(null! as NumericString, null! as NumericString)).toEqual(0);
      expect(subtract(undefined! as NumericString, undefined! as NumericString)).toEqual(0);
      expect(subtract('' as NumericString, '' as NumericString)).toEqual(0);
      expect(subtract(NaN, NaN)).toEqual(NaN);
    });

    it('should return correct value.', () => {
      expect(subtract(2, 1)).toEqual(1);
      expect(subtract('2' as NumericString, '1' as NumericString)).toEqual(1);
      expect(subtract(new BigNumber(2), new BigNumber(1))).toEqual(1);
      expect(subtract(123.2145, 52.0148)).toEqual(71.1997);
      expect(subtract('123.2145' as NumericString, '52.0148' as NumericString)).toEqual(71.1997);
      expect(subtract(Infinity, 1)).toEqual(Infinity);
    });
  });

  describe('multiple', () => {
    it('should return fallback value.', () => {
      expect(multiple(null! as NumericString, null! as NumericString)).toEqual(0);
      expect(multiple(undefined! as NumericString, undefined! as NumericString)).toEqual(0);
      expect(multiple('' as NumericString, '' as NumericString)).toEqual(0);
      expect(multiple(NaN, NaN)).toEqual(NaN);
    });

    it('should return correct value.', () => {
      expect(multiple(2, 1)).toEqual(2);
      expect(multiple('2' as NumericString, '1' as NumericString)).toEqual(2);
      expect(multiple(new BigNumber(2), new BigNumber(1))).toEqual(2);
      expect(multiple(123.2145, 52.0148)).toEqual(6408.9775746);
      expect(multiple('123.2145' as NumericString, '52.0148' as NumericString)).toEqual(6408.9775746);
      expect(multiple(Infinity, 1)).toEqual(Infinity);
    });
  });

  describe('divide', () => {
    it('should return fallback value.', () => {
      expect(divide(null! as NumericString, null! as NumericString)).toEqual(NaN);
      expect(divide(undefined! as NumericString, undefined! as NumericString)).toEqual(NaN);
      expect(divide('' as NumericString, '' as NumericString)).toEqual(NaN);
      expect(divide(NaN, NaN)).toEqual(NaN);
    });

    it('should return correct value.', () => {
      expect(divide(2, 1)).toEqual(2);
      expect(divide('2' as NumericString, '1' as NumericString)).toEqual(2);
      expect(divide(new BigNumber(2), new BigNumber(1))).toEqual(2);
      expect(divide(123.2145, 52.0148)).toEqual(2.3688354083837675);
      expect(divide('123.2145' as NumericString, '52.0148' as NumericString)).toEqual(2.3688354083837675);
      expect(divide(Infinity, 1)).toEqual(Infinity);
    });
  });

  describe('addStrictly', () => {
    it('should throw when invalid value passed.', () => {
      expect(() => addStrictly(null! as NumericString, null! as NumericString)).toThrow();
      expect(() => addStrictly(undefined! as NumericString, undefined! as NumericString)).toThrow();
      expect(() => addStrictly('' as NumericString, '' as NumericString)).toThrow();
    });

    it('should return correct value.', () => {
      expect(addStrictly(1, 2)).toEqual(3);
      expect(addStrictly('1' as NumericString, '2' as NumericString)).toEqual(3);
      expect(addStrictly(new BigNumber(1), new BigNumber(2))).toEqual(3);
      expect(addStrictly(123.2145, 52.0148)).toEqual(175.2293);
      expect(addStrictly('123.2145' as NumericString, '52.0148' as NumericString)).toEqual(175.2293);
      expect(addStrictly(Infinity, 1)).toEqual(Infinity);
    });
  });

  describe('subtractStrictly', () => {
    it('should throw when invalid value passed.', () => {
      expect(() => subtractStrictly(null! as NumericString, null! as NumericString)).toThrow();
      expect(() => subtractStrictly(undefined! as NumericString, undefined! as NumericString)).toThrow();
      expect(() => subtractStrictly('' as NumericString, '' as NumericString)).toThrow();
    });

    it('should return correct value.', () => {
      expect(subtractStrictly(2, 1)).toEqual(1);
      expect(subtractStrictly('2' as NumericString, '1' as NumericString)).toEqual(1);
      expect(subtractStrictly(new BigNumber(2), new BigNumber(1))).toEqual(1);
      expect(subtractStrictly(123.2145, 52.0148)).toEqual(71.1997);
      expect(subtractStrictly('123.2145' as NumericString, '52.0148' as NumericString)).toEqual(71.1997);
      expect(subtractStrictly(Infinity, 1)).toEqual(Infinity);
    });
  });

  describe('multipleStrictly', () => {
    it('should throw when invalid value passed.', () => {
      expect(() => multipleStrictly(null! as NumericString, null! as NumericString)).toThrow();
      expect(() => multipleStrictly(undefined! as NumericString, undefined! as NumericString)).toThrow();
      expect(() => multipleStrictly('' as NumericString, '' as NumericString)).toThrow();
    });

    it('should return correct value.', () => {
      expect(multipleStrictly(2, 1)).toEqual(2);
      expect(multipleStrictly('2' as NumericString, '1' as NumericString)).toEqual(2);
      expect(multipleStrictly(new BigNumber(2), new BigNumber(1))).toEqual(2);
      expect(multipleStrictly(123.2145, 52.0148)).toEqual(6408.9775746);
      expect(multipleStrictly('123.2145' as NumericString, '52.0148' as NumericString)).toEqual(6408.9775746);
      expect(multipleStrictly(Infinity, 1)).toEqual(Infinity);
    });
  });

  describe('divideStrictly', () => {
    it('should throw when invalid value passed.', () => {
      expect(() => divideStrictly(null! as NumericString, null! as NumericString)).toThrow();
      expect(() => divideStrictly(undefined! as NumericString, undefined! as NumericString)).toThrow();
      expect(() => divideStrictly('' as NumericString, '' as NumericString)).toThrow();
    });

    it('should return correct value.', () => {
      expect(divideStrictly(2, 1)).toEqual(2);
      expect(divideStrictly('2' as NumericString, '1' as NumericString)).toEqual(2);
      expect(divideStrictly(new BigNumber(2), new BigNumber(1))).toEqual(2);
      expect(divideStrictly(123.2145, 52.0148)).toEqual(2.3688354083837675);
      expect(divideStrictly('123.2145' as NumericString, '52.0148' as NumericString)).toEqual(2.3688354083837675);
      expect(divideStrictly(Infinity, 1)).toEqual(Infinity);
    });
  });

  describe('floorByDigit', () => {
    describe('btc_jpy pair', () => {
      let priceDigit: number;

      beforeEach(() => {
        priceDigit = 0;
      });

      it('should return floored value #1', () => {
        const value = 808138;

        const result = floorByDigit(value, priceDigit);
        expect(result).toBeTruthy();
        expect(result).toBe(808138);
      });

      it('should return floored value #2', () => {
        const value = 808138.5;

        const result = floorByDigit(value, priceDigit);
        expect(result).toBeTruthy();
        expect(result).toBe(808138);
      });
    });

    describe('xrp_jpy pair', () => {
      let priceDigit: number | undefined;

      beforeEach(() => {
        priceDigit = 3;
      });

      it('should return floored value #1', () => {
        const value = 64.655;

        const result = floorByDigit(value, priceDigit);
        expect(result).toBeTruthy();
        expect(result).toBe(64.655);
      });

      it('should return floored value #2', () => {
        const value = 64.6;

        const result = floorByDigit(value, priceDigit);
        expect(result).toBeTruthy();
        expect(result).toBe(64.6);
      });

      it('should return floored value #3', () => {
        const value = 64.6558;

        const result = floorByDigit(value, priceDigit);
        expect(result).toBeTruthy();
        expect(result).toBe(64.655);
      });
    });

    describe('ltc_btc pair', () => {
      let priceDigit: number;

      beforeEach(() => {
        priceDigit = 8;
      });

      it('should return floored value #1', () => {
        const value = 0.01598311;

        const result = floorByDigit(value, priceDigit);
        expect(result).toBeTruthy();
        expect(result).toBe(0.01598311);
      });
    });

    describe('eth_btc pair', () => {
      let priceDigit: number;

      beforeEach(() => {
        priceDigit = 8;
      });

      it('should return floored value #1', () => {
        const value = 0.07678989;

        const result = floorByDigit(value, priceDigit);
        expect(result).toBeTruthy();
        expect(result).toBe(0.07678989);
      });
    });

    describe('mona_jpy pair', () => {
      let priceDigit: number;

      beforeEach(() => {
        priceDigit = 3;
      });

      it('should return floored value #1', () => {
        const value = 366.897;

        const result = floorByDigit(value, priceDigit);
        expect(result).toBeTruthy();
        expect(result).toBe(366.897);
      });
    });

    describe('mona_btc pair', () => {
      let priceDigit: number;

      beforeEach(() => {
        priceDigit = 8;
      });

      it('should return floored value #1', () => {
        const value = 0.000454;

        const result = floorByDigit(value, priceDigit);
        expect(result).toBeTruthy();
        expect(result).toBe(0.000454);
      });
    });

    describe('bcc_jpy pair', () => {
      let priceDigit: number;

      beforeEach(() => {
        priceDigit = 0;
      });

      it('should return floored value #7', () => {
        const value = 107999;

        const result = floorByDigit(value, priceDigit);
        expect(result).toBeTruthy();
        expect(result).toBe(107999);
      });
    });

    describe('bcc_btc pair', () => {
      let priceDigit: number;

      beforeEach(() => {
        priceDigit = 8;
      });

      it('should return floored value #8', () => {
        const value = 0.13387562;

        const result = floorByDigit(value, priceDigit);
        expect(result).toBeTruthy();
        expect(result).toBe(0.13387562);
      });
    });
  });

  describe('pow', () => {
    it('should throw when invalid value passed.', () => {
      // digit should be interger
      expect(() => pow(2, 0.1)).toThrow();
      expect(() => pow(2, -0.1)).toThrow();
    });

    it('should return correct value.', () => {
      expect(pow(2, 1)).toBe(2);
      expect(pow(2, -1)).toBe(0.5);

      expect(pow(-2, 1)).toBe(-2);
      expect(pow(-2, -1)).toBe(-0.5);

      expect(pow(0.2, 1)).toBe(0.2);
      expect(pow(-0.2, -1)).toBe(-5);

      // round to safe integer
      expect(pow(Number.MAX_SAFE_INTEGER + 1, 1)).toBe(Number.MAX_SAFE_INTEGER + 1);

      // see: https://stackoverflow.com/questions/55958535/strange-result-for-math-pow-in-javascript-across-different-browsers/55959216#55959216
      expect(pow(10, -4)).toBe(0.0001);
    });
  });

  describe('formatComma', () => {
    it('should return formatted value #1', () => {
      const value = '1029324';

      const result = formatComma(value);
      expect(result).toBeTruthy();
      expect(result).toBe('1,029,324');
    });

    it('should return formatted value #2', () => {
      const value = '1310.19723';

      const result = formatComma(value);
      expect(result).toBeTruthy();
      expect(result).toBe('1,310.19723');
    });

    it('should return formatted value #2', () => {
      const value = '1310.19723';

      const result = formatComma(value, 1);
      expect(result).toBeTruthy();
      expect(result).toBe('1,310.2');
    });

    it('should return formatted value #3', () => {
      const value = '0.02504347';

      const result = formatComma(value);
      expect(result).toBeTruthy();
      expect(result).toBe('0.02504347');
    });
  });
});
