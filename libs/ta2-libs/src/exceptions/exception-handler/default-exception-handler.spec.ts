import { DefaultExceptionHandler } from './default-exception-handler';

describe('DefaultExceptionFilter', () => {
  it('should handle exception', () => {
    const exception = new Error('test error');
    expect(DefaultExceptionHandler.handle('class', 'method', exception));
  });
});
