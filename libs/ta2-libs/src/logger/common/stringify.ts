import { stringify as circular_stringify } from 'circular-json';

import { SENSITIVE_FIELDS_SET } from './predef';

function replacer<T>(key: string, value: T): T {
  if (SENSITIVE_FIELDS_SET.has(key)) {
    return ('*censored*' as any) as T;
  }

  return value;
}

export function stringify(data: any, replaceSensitive?: boolean): string {
  return replaceSensitive ? circular_stringify(data, replacer) : circular_stringify(data);
}
