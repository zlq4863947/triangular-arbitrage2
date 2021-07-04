import { InjectionToken } from '@ta2-libs/common';

import { TradingStrategy } from './trading-strategy';

export const TRADING_STRATEGY = new InjectionToken<TradingStrategy>('TRADING_STRATEGY');
