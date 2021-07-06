import { Observable, OperatorFunction, from, pipe, throwError, timer } from 'rxjs';
import { concatMap, filter, mergeMap, retryWhen, take } from 'rxjs/operators';

/**
 * Do nothing
 */
export const noop = <T>(): OperatorFunction<T, T> => (source: Observable<T>) => source;

export const flatten = <T>(): OperatorFunction<T[], T> => pipe(concatMap((items) => from(items)));

export const skipNullOrUndefined = <T>(): OperatorFunction<null | undefined | T, T> => {
  function isNotNullOrUndefined(input: null | undefined | T): input is T {
    return input != null;
  }

  return (source$) => source$.pipe(filter(isNotNullOrUndefined));
};

export const retryWithDelay = <T, E extends Error>(
  limitCount: number,
  intervalMs = 1000,
  predicate: (error: E) => boolean,
): OperatorFunction<T, T> =>
  pipe(
    retryWhen((error$) =>
      error$.pipe(
        mergeMap((error, i) => {
          if (!predicate(error)) {
            return throwError(error);
          }
          if (i >= limitCount) {
            return throwError(error);
          }
          return timer(intervalMs);
        }),
      ),
    ),
  );

export const useFirstValue = <T>(observable: Observable<T>): Promise<T> => observable.pipe(take(1)).toPromise();
