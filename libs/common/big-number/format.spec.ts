import { abs, absToString, ceilToString, fix, floorToFixed, floorToString, stripZero } from './format';

describe('floorToString', () => {
  describe('for integer', () => {
    it('should return expected result', () => {
      // big integer
      expect(floorToString('100000000000000000000000000')).toBe('1e+26');
      expect(floorToString(0.1)).toBe('0');
      expect(floorToString('0.0000000000000000000000001')).toBe('0');
    });
  });

  describe('for decimal', () => {
    it('should return expected result', () => {
      expect(floorToString(1.23456789, 0)).toBe('1');
      expect(floorToString(1.23456789, 1)).toBe('1.2');
      expect(floorToString(1.23456789, 2)).toBe('1.23');
      expect(floorToString(1.23456789, 3)).toBe('1.234');
      expect(floorToString(1.23456789, 4)).toBe('1.2345');
      expect(floorToString(1.23456789, 5)).toBe('1.23456');
      expect(floorToString(1.23456789, 6)).toBe('1.234567');
      expect(floorToString(1.23456789, 7)).toBe('1.2345678');
      expect(floorToString(1.23456789, 8)).toBe('1.23456789');
    });
  });
});

describe('floorToFixed', () => {
  describe('When proper values are provided', () => {
    it('should calculate values properly', () => {
      expect(floorToFixed('1.23456789', 0)).toBe('1');
      expect(floorToFixed('1.234567890', 7)).toBe('1.2345678');
      expect(floorToFixed('1.234567890', 8)).toBe('1.23456789');
      expect(floorToFixed('1.234567890', 9)).toBe('1.234567890');
    });
  });
});

describe('ceil', () => {
  describe('When proper values are provided', () => {
    it('should calculate values properly', () => {
      expect(ceilToString('1.23456789', 0)).toBe('2');
      expect(ceilToString('1.234567890', 1)).toBe('1.3');
      expect(ceilToString('1.234567890', 2)).toBe('1.24');
      expect(ceilToString('1.234567890', 3)).toBe('1.235');
      expect(ceilToString('1.234567890', 4)).toBe('1.2346');
      expect(ceilToString('1.234567890', 5)).toBe('1.23457');
      expect(ceilToString('1.234567890', 6)).toBe('1.234568');
      expect(ceilToString('1.234567890', 7)).toBe('1.2345679');
      expect(ceilToString('1.234567890', 8)).toBe('1.23456789');
      expect(ceilToString('1.234567890', 9)).toBe('1.23456789');
    });
  });
});

describe('fix', () => {
  describe('When proper values are provided', () => {
    it('should calculate values properly', () => {
      const base = '0.001';
      expect(fix(base, 1)).toBe('0.0');
      expect(fix(base, 2)).toBe('0.00');
      expect(fix(base, 3)).toBe('0.001');
      expect(fix(base, 4)).toBe('0.0010');
    });

    it('should round values', () => {
      const base = '0.009';
      expect(fix(base, 2)).toBe('0.01');
    });
  });
});

describe('stripZero', () => {
  it('should work', () => {
    expect(stripZero('1.000000000000000000000001')).toBe('1.000000000000000000000001');
    expect(stripZero('1.000000000000000000000000')).toBe('1');
    expect(stripZero('10000000000000')).toBe('10000000000000');
  });
});

describe('abs', () => {
  it('should work', () => {
    expect(abs(1).toNumber()).toBe(1);
    expect(abs(-1).toNumber()).toBe(1);
  });
});

describe('absToString', () => {
  it('should work', () => {
    expect(absToString(1)).toBe('1');
    expect(absToString(-1)).toBe('1');
  });
});
