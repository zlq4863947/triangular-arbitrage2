import { ExceptionHandler } from './exception-handler';

export class DefaultExceptionHandler extends ExceptionHandler {
  static handle(className: string, methodName: string, args: any, exception: Error): void {
    const _global = global as any;
    const logger = _global && _global.logger ? _global.logger : console;
    logger.error(`${className},${methodName}`, JSON.stringify(args), exception.stack);
    if (_global.notification) {
      const title = `${className}-${methodName}`;
      _global.notification.sendEmail({
        subject: `[异常警报] ${title}`,
        title,
        body: exception.stack,
      });
    }
  }
}
