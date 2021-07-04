export type Nominal<T, Name extends string> = T & {
  [Symbol.species]: Name;
};

/**
 * numeric string
 *
 * ex) '100', '0.0001'
 */
export type NumericString = Nominal<string, 'NumericString'>;
