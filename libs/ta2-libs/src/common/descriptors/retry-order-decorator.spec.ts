import { ExecutionType } from '@ta2-libs/broker-api';

import { RetryOrder } from './retry-order.decorator';

class Foo {
  name = 'foo';
  status = 'test';

  @RetryOrder(1000)
  order(edge: any, options?: { isRetry: boolean }): any {
    if (options.isRetry) {
      console.log('is retry order');
    }
    console.log('do order...', this.status);

    return {
      info: {
        status: this.status,
      },
    };
  }
}

describe('RetryOrder', () => {
  it('func', (done: () => void) => {
    const foo = new Foo();
    expect(foo.order({}));
    setTimeout(() => {
      foo.status = ExecutionType.FILLED;
    }, 5000);

    setTimeout(() => done(), 8000);
  });
});
