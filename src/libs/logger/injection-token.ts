import { Injectable, Type } from '@nestjs/common';

@Injectable()
export class InjectionToken<T> {
  readonly ngMetadataName = 'InjectionToken';

  readonly ɵprov: unknown;

  constructor(
    protected _desc: string,
    options?: {
      providedIn?: Type<any> | 'root' | 'platform' | 'any' | null;
      factory: () => T;
    },
  ) {
    this.ɵprov = undefined;
    if (typeof options == 'number') {
      // This is a special hack to assign __NG_ELEMENT_ID__ to this instance.
      // See `InjectorMarkers`
      (this as any).__NG_ELEMENT_ID__ = options;
    } else if (options !== undefined) {
      this.ɵprov = ɵɵdefineInjectable({
        token: this,
        providedIn: options.providedIn || 'root',
        factory: options.factory,
      });
    }
  }

  toString(): string {
    return `InjectionToken ${this._desc}`;
  }
}

export function ɵɵdefineInjectable<T>(opts: {
  token: unknown;
  providedIn?: Type<any> | 'root' | 'platform' | 'any' | null;
  factory: () => T;
}): unknown {
  return {
    token: opts.token,
    providedIn: (opts.providedIn as any) || null,
    factory: opts.factory,
    value: undefined,
  } as ɵɵInjectableDef<T>;
}

export interface ɵɵInjectableDef<T> {
  /**
   * Specifies that the given type belongs to a particular injector:
   * - `InjectorType` such as `NgModule`,
   * - `'root'` the root injector
   * - `'any'` all injectors.
   * - `null`, does not belong to any injector. Must be explicitly listed in the injector
   *   `providers`.
   */
  providedIn: InjectorType<any> | 'root' | 'platform' | 'any' | null;

  /**
   * The token to which this definition belongs.
   *
   * Note that this may not be the same as the type that the `factory` will create.
   */
  token: unknown;

  /**
   * Factory method to execute to create an instance of the injectable.
   */
  factory: (t?: Type<any>) => T;

  /**
   * In a case of no explicit injector, a location where the instance of the injectable is stored.
   */
  value: T | undefined;
}

export interface InjectorType<T> extends Type<T> {
  ɵfac?: unknown;
  ɵinj: unknown;
}
