import { Market } from 'ccxt';

import { Edge } from '../../../models';
import { getEdgeOrderAmount } from './get-edge-order-amount';

describe('getEdgeOrderAmount utils functions', () => {
  it('getEdgeOrderAmount #1', () => {
    const edge: Edge = {
      pair: 'BTC/BUSD',
      fromAsset: 'BUSD',
      toAsset: 'BTC',
      side: 'buy',
      price: 33457.48,
      quantity: 0.050511,
    };

    const pairInfo: Market = {
      limits: {
        amount: {
          min: 0.000001,
          max: 9000,
        },
        price: {
          min: 0.01,
          max: 1000000,
        },
        cost: {
          min: 10,
        },
        market: {
          min: 0,
          max: 102.63482992,
        },
      },
      precision: {
        base: 8,
        quote: 8,
        amount: 6,
        price: 2,
      },
      tierBased: false,
      percentage: true,
      taker: 0.001,
      maker: 0.001,
      feeSide: 'get',
      id: 'BTCBUSD',
      lowercaseId: 'btcbusd',
      symbol: 'BTC/BUSD',
      base: 'BTC',
      quote: 'BUSD',
      baseId: 'BTC',
      quoteId: 'BUSD',
      info: {
        symbol: 'BTCBUSD',
        status: 'TRADING',
        baseAsset: 'BTC',
        baseAssetPrecision: '8',
        quoteAsset: 'BUSD',
        quotePrecision: '8',
        quoteAssetPrecision: '8',
        baseCommissionPrecision: '8',
        quoteCommissionPrecision: '8',
        orderTypes: ['LIMIT', 'LIMIT_MAKER', 'MARKET', 'STOP_LOSS_LIMIT', 'TAKE_PROFIT_LIMIT'],
        icebergAllowed: true,
        ocoAllowed: true,
        quoteOrderQtyMarketAllowed: true,
        isSpotTradingAllowed: true,
        isMarginTradingAllowed: true,
        filters: [
          {
            filterType: 'PRICE_FILTER',
            minPrice: '0.01000000',
            maxPrice: '1000000.00000000',
            tickSize: '0.01000000',
          },
          {
            filterType: 'PERCENT_PRICE',
            multiplierUp: '5',
            multiplierDown: '0.2',
            avgPriceMins: '5',
          },
          {
            filterType: 'LOT_SIZE',
            minQty: '0.00000100',
            maxQty: '9000.00000000',
            stepSize: '0.00000100',
          },
          {
            filterType: 'MIN_NOTIONAL',
            minNotional: '10.00000000',
            applyToMarket: true,
            avgPriceMins: '5',
          },
          {
            filterType: 'ICEBERG_PARTS',
            limit: '10',
          },
          {
            filterType: 'MARKET_LOT_SIZE',
            minQty: '0.00000000',
            maxQty: '102.63482992',
            stepSize: '0.00000000',
          },
          {
            filterType: 'MAX_NUM_ORDERS',
            maxNumOrders: '200',
          },
          {
            filterType: 'MAX_NUM_ALGO_ORDERS',
            maxNumAlgoOrders: '5',
          },
        ],
        permissions: ['SPOT', 'MARGIN'],
      },
      type: 'spot',
      spot: true,
      margin: true,
      future: false,
      delivery: false,
      active: true,
    } as any;
    const res = getEdgeOrderAmount(edge, pairInfo, 0);
    expect(res).toEqual(0.000896);
  });
});
