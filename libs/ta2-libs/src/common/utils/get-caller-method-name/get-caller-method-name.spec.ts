import { getCallerMethodName } from './get-caller-method-name';

describe('getCallerMethodName util functions', () => {
  it('getCallerMethodName #1', () => {
    const errStack =
      'Error: \n' +
      '    at Logger.prototype.<computed> (/Users/pro/trader/triangular-arbitrage2-pro/src/app/common/descriptors/log-caller.decorator.ts:12:17)\n' +
      '    at TapSubscriber._tapNext (/Users/pro/trader/triangular-arbitrage2-pro/src/app/feature-modules/engine/engine.service.ts:88:21)\n' +
      '    at TapSubscriber._next (/Users/pro/trader/triangular-arbitrage2-pro/node_modules/rxjs/src/internal/operators/tap.ts:120:21)\n' +
      '    at TapSubscriber.Subscriber.next (/Users/pro/trader/triangular-arbitrage2-pro/node_modules/rxjs/src/internal/Subscriber.ts:99:12)\n' +
      '    at MapSubscriber._next (/Users/pro/trader/triangular-arbitrage2-pro/node_modules/rxjs/src/internal/operators/map.ts:89:22)\n' +
      '    at MapSubscriber.Subscriber.next (/Users/pro/trader/triangular-arbitrage2-pro/node_modules/rxjs/src/internal/Subscriber.ts:99:12)\n' +
      '    at CatchSubscriber.Subscriber._next (/Users/pro/trader/triangular-arbitrage2-pro/node_modules/rxjs/src/internal/Subscriber.ts:139:22)\n' +
      '    at CatchSubscriber.Subscriber.next (/Users/pro/trader/triangular-arbitrage2-pro/node_modules/rxjs/src/internal/Subscriber.ts:99:12)\n' +
      '    at FilterSubscriber._next (/Users/pro/trader/triangular-arbitrage2-pro/node_modules/rxjs/src/internal/operators/filter.ts:101:24)\n' +
      '    at FilterSubscriber.Subscriber.next (/Users/pro/trader/triangular-arbitrage2-pro/node_modules/rxjs/src/internal/Subscriber.ts:99:12)';
    expect(getCallerMethodName(errStack)).toEqual('_tapNext');
  });
  it('getCallerMethodName #2', () => {
    const errStack =
      'Error: \n' +
      '    at Logger.prototype.<computed> (/Users/yuukisyaku/pro/trader/triangular-arbitrage2-pro/src/app/common/descriptors/log-caller.decorator.ts:14:17)\n' +
      '    at prototype.<computed>.execute (/Users/yuukisyaku/pro/trader/triangular-arbitrage2-pro/src/app/core/strategy/trading-strategy/multi-trading-strategy.ts:24:17)\n' +
      '    at prototype.<computed> (/Users/yuukisyaku/pro/trader/triangular-arbitrage2-pro/src/app/common/descriptors/catch-error.decorator.ts:15:41)\n' +
      '    at Strategy.execute (/Users/yuukisyaku/pro/trader/triangular-arbitrage2-pro/src/app/core/strategy/strategy.ts:13:33)\n' +
      '    at prototype.<computed>.start (/Users/yuukisyaku/pro/trader/triangular-arbitrage2-pro/src/app/feature-modules/trade/trade.service.ts:49:25)\n' +
      '    at processTicksAndRejections (internal/process/task_queues.js:95:5)';
    expect(getCallerMethodName(errStack)).toEqual('execute');
  });
  it('getCallerMethodName #3', () => {
    const errStack =
      'stack: Error\n' +
      '    at Logger.Object.getOwnPropertyNames.filter.forEach.e.<computed> (/Users/yuukisyaku/pro/trader/triangular-arbitrage2-pro/dist/triangular-arbitrage2-pro/bundle.js:40:366)\n' +
      '    at Object.getOwnPropertyNames.filter.forEach.o.<computed>.start (/Users/yuukisyaku/pro/trader/triangular-arbitrage2-pro/dist/triangular-arbitrage2-pro/bundle.js:16:1113)\n' +
      '    at Object.getOwnPropertyNames.filter.forEach.o.<computed> (/Users/yuukisyaku/pro/trader/triangular-arbitrage2-pro/dist/triangular-arbitrage2-pro/bundle.js:24:383)\n' +
      '    at bootstrap (/Users/yuukisyaku/pro/trader/triangular-arbitrage2-pro/dist/triangular-arbitrage2-pro/bundle.js:276597:335)\n' +
      '    at processTicksAndRejections (internal/process/task_queues.js:95:5)\n';
    expect(getCallerMethodName(errStack)).toEqual('start');
  });
});
