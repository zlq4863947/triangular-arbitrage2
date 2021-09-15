import { getCallerMethodName } from '../utils';

export function LogCaller(): Function {
  return function (target: Function) {
    const prototype = target.prototype;
    const methods = Object.getOwnPropertyNames(prototype).filter(
      (prop) => typeof prototype[prop] === 'function' && prop !== 'constructor' && prop !== 'requestLog' && prop !== 'error',
    );
    methods.forEach(function (methodName: string): void {
      const originalMethod = prototype[methodName];

      prototype[methodName] = function (...args) {
        try {
          throw new Error();
        } catch (err) {
          const callerClassName = args[0];
          args.shift();
          const callerMethodName = getCallerMethodName(err.stack);
          const tag = `${callerClassName},${callerMethodName}`;
          return originalMethod.apply(this, [tag, ...args]);
        }
      };
    });
  };
}
