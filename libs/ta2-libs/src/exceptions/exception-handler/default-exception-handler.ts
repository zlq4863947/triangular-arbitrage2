import { ExceptionHandler } from './exception-handler';

export class DefaultExceptionHandler extends ExceptionHandler {
  static handle(className: string, methodName: string, args: any, exception: Error): void {
    const _global = global as any;
    const fn = _global && _global.logger ? _global.logger.error : console.error;
    fn(`${className},${methodName}`, JSON.stringify(args), exception.stack);
  }
}
