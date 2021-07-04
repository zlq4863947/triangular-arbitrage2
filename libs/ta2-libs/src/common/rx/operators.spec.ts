import { BehaviorSubject, Observable, ReplaySubject, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { flatten, retryWithDelay, useFirstValue } from './operators';

describe('lib/rx/operators', () => {
  describe('flatten', () => {
    it('should work well', (done) => {
      const source: Observable<number[]> = of([1, 2, 3, 4, 5]);
      const flattened: Observable<number> = source.pipe(flatten());

      flattened.pipe(take(1)).subscribe((data) => {
        expect(data).toEqual(1);
        done();
      });
    });
  });

  describe('retryWithDelay', () => {
    it('should ignore errors twice and return value at 3rd', (done) => {
      let count = 0;
      const source = of(null).pipe(
        tap(() => {
          count++;
          if (count <= 3) {
            // 3回エラー
            throw new Error(`error`);
          }
        }),
      );
      const dest = source.pipe(retryWithDelay(3, 100, () => true));

      dest.pipe().subscribe({
        next: () => {
          expect(count).toBe(4);
          done();
        },
      });
    });

    it('should ignore errors 3 times and throw an error at 4th', (done) => {
      let count = 0;
      const source = of(null).pipe(
        tap((i) => {
          count++;
          if (count <= 4) {
            // 4回エラー
            throw new Error(`error`);
          }
        }),
      );
      const dest = source.pipe(retryWithDelay(3, 100, () => true));

      dest.pipe().subscribe({
        error: () => {
          expect(count).toBe(4);
          done();
        },
      });
    });
  });

  it('should throw error when predicate returns false', (done) => {
    let count = 0;
    const source = of(null).pipe(
      tap((i) => {
        count++;
        if (count <= 4) {
          // 4回エラー
          throw new Error(`error`);
        }
      }),
    );
    const dest = source.pipe(retryWithDelay(3, 100, () => false));

    dest.pipe().subscribe({
      error: () => {
        expect(count).toBe(1);
        done();
      },
    });
  });

  describe('useLatestValue', () => {
    it('should work well with BehaviorSubject', async () => {
      const source = new BehaviorSubject('foo');
      const snapshot1 = await useFirstValue(source);
      expect(snapshot1).toBe('foo');

      source.next('bar');
      const snapshot2 = await useFirstValue(source);
      expect(snapshot2).toBe('bar');
    });

    it('should work well with ReplaySubject', async () => {
      const source = new ReplaySubject(2);
      source.next('foo');
      source.next('bar');
      const snapshot = await useFirstValue(source);
      expect(snapshot).toBe('foo');
    });
  });
});
