type StringTransformerFunction = (value?: string | null | undefined) => string | null | undefined;

interface StringTransformer {
  from: StringTransformerFunction;
  to: StringTransformerFunction;
}

export function getFloorByDigitsTransformer(digit: number): StringTransformer {
  return {
    from: (value?: string | null | undefined) => value,
    to: (value?: string | null | undefined) => {
      if (value === undefined || value === null) {
        return value;
      }
      console.log('1111:', value);

      const [integer, fraction] = value.split('.');
      if (fraction === undefined) {
        return value;
      }

      const fractionReduced = fraction.substr(0, digit);

      return `${integer}.${fractionReduced}`;
    },
  };
}

export const nullableDateTransformer = {
  from: (value?: Date | null | undefined | number) => {
    if (value === undefined || value === null) {
      return value;
    }

    if (value instanceof Date) {
      return value.getTime();
    }

    return value;
  },
  to: (value?: number | null | undefined) => {
    if (value === undefined || value === null) {
      return value;
    }

    return new Date(value);
  },
};

/**
 * Use this transformer for the following case.
 *   - we want to use a value as `boolean` in application, but store it as `tinyint` into DB.
 */
export const booleanTinyintTransformer = {
  from: (val: 0 | 1): boolean => !!val,
  to: (val: boolean) => {
    if (val === undefined || val === null) {
      return val;
    }
    const n = Number(val);
    if (Number.isNaN(n)) {
      throw new Error(`Invalid boolean value ${val}`);
    }

    return n as 0 | 1;
  },
};

/**
 * Use this when tinyint has a default value i.e. '0' or '1'.
 * @see MasterPairEntity
 */
export const nullableBooleanTinyintTransformer = {
  from: (val: 0 | 1): boolean => !!val,
  to: (val: boolean | null | undefined) => {
    if (val === undefined || val === null) {
      return val;
    }

    return Number(val) as 0 | 1;
  },
};
