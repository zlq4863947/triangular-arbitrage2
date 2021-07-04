import { ExecutionContext } from '@nestjs/common';
// tslint:disable-next-line:no-submodule-imports
import { RpcArgumentsHost } from '@nestjs/common/interfaces';

export function getDummyExecutionContext(args?: any, res?: any): ExecutionContext {
  return {
    getType(): any {},
    getArgs(): any {},
    getArgByIndex(): any {},
    switchToHttp() {
      return {
        getRequest<T = any>(): any {
          return args ? { body: args } : null;
        },
        getResponse<T = any>(): T {
          return res as T;
        },
        getNext<T = any>(): T {
          return res as T;
        },
      };
    },
    switchToRpc(): RpcArgumentsHost {
      return {
        getData<T = any>(): T {
          return args as T;
        },
        getContext<T = any>(): T {
          return args as T;
        },
      };
    },
    switchToWs(): any {},
    getClass(): any {},
    getHandler(): any {},
  };
}

export const createArgumentsHost = (): any => {
  return {
    switchToHttp: () => {
      return {
        getResponse: () => {
          return {
            status: (...args: any) => {
              return {
                json: (...json: any) => {},
              };
            },
          };
        },
      };
    },
  };
};
