import { ExecutionType } from '@ta2-libs/broker-api/binance-api/types/ws';

export interface RetryOrderOptions {
  isRetry: true;
  orderResult: any;
}

export function RetryOrder(delayMs: number): Function {
  return function (target: Function, methodName: string, descriptor: PropertyDescriptor) {
    try {
      const originalMethod = descriptor.value;
      descriptor.value = function (...args) {
        const result = originalMethod.call(this, ...args);
        if (result && result.info && result.info.status !== ExecutionType.FILLED) {
          retry.bind(this)(originalMethod, [...args, { isRetry: true, orderResult: result }], delayMs);
        }
        return result;
      };
    } catch (e) {
      console.error(e);
    }

    return descriptor;
  };
}

function retry(fn: Function, args: any[], delayMs: number): string {
  const result = fn.apply(this, args);
  if (result && result.info && result.info.status !== ExecutionType.FILLED) {
    setTimeout(() => retry.bind(this)(fn, args, delayMs), delayMs);
  }
  return result;
}
