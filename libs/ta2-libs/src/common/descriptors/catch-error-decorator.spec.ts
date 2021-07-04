import { useFirstValue } from '@ta2-libs/common';
import { Observable } from 'rxjs';

import { DefaultExceptionHandler } from '../../exceptions';
import { CatchError } from './catch-error.decorator';

@CatchError(DefaultExceptionHandler)
class Foo {
  func() {
    throw new Error('func error');
  }

  func2(param: any) {
    return param;
  }

  funcPromise(): Promise<void> {
    return new Promise(() => {
      throw new Error('funcPromise error');
    });
  }

  funcObservable(): Observable<any> {
    return new Observable((observer) => {
      try {
        throw new Error('funcObservable error');
        observer.next(1);
      } catch (err) {
        observer.error(err);
      } finally {
        observer.complete();
      }
    });
  }
}

describe('DefaultExceptionFilter', () => {
  const foo = new Foo();

  it('func', () => {
    expect(foo.func());
  });

  it('func2', () => {
    const data = { hogehoge: 1001 };
    expect(foo.func2(data)).toEqual(data);
  });

  it('funcPromise', async () => {
    await expect(foo.funcPromise());
  });

  it('funcObservable', async () => {
    await expect(useFirstValue(foo.funcObservable()));
  });
});
