import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ExceptionHandler } from '../../exceptions';

export function CatchError(handler: ExceptionHandler): Function {
  return function (target: Function) {
    const prototype = target.prototype;
    const className = target.name;
    const methods = Object.getOwnPropertyNames(prototype).filter((prop) => typeof prototype[prop] === 'function');
    methods.forEach(function (methodName: string): void {
      const originalMethod = prototype[methodName];
      prototype[methodName] = function (...args) {
        try {
          const result = originalMethod.apply(this, args);
          if (result) {
            // is promise function
            if (typeof result['catch'] === 'function') {
              return result.catch((e) => handler.handle(className, methodName, args, e));
            } else if (typeof result['subscribe'] === 'function') {
              // is observable function
              return result.pipe(
                catchError((error) => {
                  handler.handle(className, methodName, args, error);
                  return of();
                }),
              );
            }
          }
          return result;
        } catch (e) {
          handler.handle(className, methodName, args, e);
        }
      };
    });
  };
}
