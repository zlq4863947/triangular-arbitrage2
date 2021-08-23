import { Order } from 'ccxt';

export const mockOrder: Order = {
  info: {
    symbol: 'ETHBTC',
    orderId: '2162102936',
    orderListId: '-1',
    clientOrderId: 'ETHBTC_1629472740257',
    transactTime: '1629472741283',
    price: '0.06763600',
    origQty: '0.02800000',
    executedQty: '0.02800000',
    cummulativeQuoteQty: '0.00189380',
    status: 'FILLED',
    timeInForce: 'GTC',
    type: 'LIMIT',
    side: 'BUY',
    fills: [
      {
        price: '0.06763600',
        qty: '0.02800000',
        commission: '0.00015425',
        commissionAsset: 'BNB',
        tradeId: '290543691',
      },
    ],
  },
  id: '2162102936',
  clientOrderId: 'ETHBTC_1629472740257',
  timestamp: 1629472741283,
  datetime: '2021-08-20T15:19:01.283Z',
  symbol: 'ETH/BTC',
  type: 'limit',
  timeInForce: 'GTC',
  postOnly: false,
  side: 'buy',
  price: 0.067636,
  amount: 0.028,
  cost: 0.0018938,
  average: 0.06763571428571429,
  filled: 0.028,
  remaining: 0,
  status: 'closed',
  fee: {
    cost: 0.00015425,
    currency: 'BNB',
  },
  trades: [
    {
      info: {
        price: '0.06763600',
        qty: '0.02800000',
        commission: '0.00015425',
        commissionAsset: 'BNB',
        tradeId: '290543691',
      },
      symbol: 'ETH/BTC',
      price: 0.067636,
      amount: 0.028,
      cost: 0.001893808,
      fee: {
        cost: 0.00015425,
        currency: 'BNB',
      },
    },
  ],
  fees: [
    {
      cost: 0.00015425,
      currency: 'BNB',
    },
  ],
} as any;
