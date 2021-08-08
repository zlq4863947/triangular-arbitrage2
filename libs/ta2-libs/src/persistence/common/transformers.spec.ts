import {
  booleanTinyintTransformer,
  getFloorByDigitsTransformer,
  nullableBooleanTinyintTransformer,
  nullableDateTransformer,
} from './transformers';

describe('transformers', () => {
  it('getFloorByDigitsTransformer', async () => {
    const transformer = getFloorByDigitsTransformer(4);
    expect(transformer.from(null)).toEqual(null);
    expect(transformer.to(null)).toEqual(null);
    expect(transformer.to('0.00015')).toEqual('0.0001');
    expect(transformer.to('1')).toEqual('1');
  });

  it('nullableDateTransformer', async () => {
    const date = new Date();
    expect(nullableDateTransformer.from(null)).toEqual(null);
    expect(nullableDateTransformer.from(date)).toEqual(date.getTime());
    expect(nullableDateTransformer.from(date.getTime())).toEqual(date.getTime());
    expect(nullableDateTransformer.to(null)).toEqual(null);
    expect(nullableDateTransformer.to(date.getTime())).toEqual(date);
  });

  it('booleanTinyintTransformer', async () => {
    expect(booleanTinyintTransformer.from(0)).toBeFalsy();
    expect(booleanTinyintTransformer.from(1)).toBeTruthy();
    expect(booleanTinyintTransformer.to(<any>null)).toEqual(null);
    try {
      expect(booleanTinyintTransformer.to(<any>NaN)).toEqual(new Error(`Invalid boolean value NaN`));
    } catch (e) {}
    expect(booleanTinyintTransformer.to(false)).toEqual(0);
    expect(booleanTinyintTransformer.to(true)).toEqual(1);
  });

  it('nullableBooleanTinyintTransformer', async () => {
    expect(nullableBooleanTinyintTransformer.from(0)).toBeFalsy();
    expect(nullableBooleanTinyintTransformer.from(1)).toBeTruthy();
    expect(nullableBooleanTinyintTransformer.to(null)).toEqual(null);
    expect(nullableBooleanTinyintTransformer.to(false)).toEqual(0);
    expect(nullableBooleanTinyintTransformer.to(true)).toEqual(1);
  });
});
