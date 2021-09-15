import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class OnDestroyService implements OnModuleDestroy {
  // control subscription of observables.
  // when emit true, all subscribe on this component are disposed.
  protected onDestroy$ = new Subject<true>();

  constructor() {}

  onModuleDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
