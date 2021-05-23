/**
 * 事件类型
 */
export const EventType = {
  // 24小时Ticker
  Ticker24hr: '24hrTicker',
  // 订单更新
  ExecutionReport: 'executionReport',
  // 帐户余额发生变化
  OutboundAccountPosition: 'outboundAccountPosition',
} as const;

export type EventType = typeof EventType[keyof typeof EventType];

export interface EventData {
  eventType: EventType; // "24hrTicker" or "executionReport",   事件类型
  eventTime: number; // 123456789,            事件时间
  symbol: string; // "BNBBTC",                交易对
}

export interface Ticker24Hr extends EventData {
  priceChange: string; // "0.0015",           24小时价格变化
  priceChangePercent: string; // "250.00",    24小时价格变化(百分比)
  weightedAveragePrice: string; // "0.0018",  平均价格
  previousClose: string; // "0.0009",         整整24小时之前，向前数的最后一次成交价格
  currentClose: string; // "0.0025",          最新成交价格
  closeQuantity: string; // "10",             最新成交交易的成交量
  bestBid: string; // "0.0024",               目前最高买单价
  bestBidQuantity: string; // "10",           目前最高买单价的挂单量
  bestAskPrice: string; // "0.0026",          目前最低卖单价
  bestAskQuantity: string; // "100",          目前最低卖单价的挂单量
  open: string; // "0.0010",                  整整24小时前，向后数的第一次成交价格
  high: string; // "0.0025",                  24小时内最高成交价
  low: string; // "0.0010",                   24小时内最低成交价
  baseAssetVolume: string; // "10000",        24小时内成交量
  quoteAssetVolume: string; // "18",          24小时内成交额
  openTime: number; // 0,                     统计开始时间
  closeTime: number; // 86400000,             统计结束时间
  firstTradeId: number; // 0,                  24小时内第一笔成交交易ID
  lastTradeId: number; // 18150,              24小时内最后一笔成交交易ID
  trades: number; // 18151                    24小时内成交数
}

/**
 * 执行类型
 */
export const ExecutionType = {
  // 新订单
  NEW: 'NEW',
  // 订单被取消
  CANCELED: 'CANCELED',
  // 新订单被拒绝
  REJECTED: 'REJECTED',
  // 订单有新成交
  TRADE: 'TRADE',
  // 订单失效(根据订单的Time In Force参数)
  EXPIRED: 'EXPIRED',
  FILLED: 'FILLED',
} as const;

export type ExecutionType = typeof ExecutionType[keyof typeof ExecutionType];

/**
 * 订单更新
 * https://binance-docs.github.io/apidocs/spot/cn/#payload-2
 */
export interface UserData extends EventData {
  newClientOrderId: string; // "IoyjBHK8OIGkFJN2DtCX6N",    Client order ID
  side: string; // "SELL",                                  订单方向
  orderType: string; // "LIMIT",                            订单类型
  cancelType: string; // "GTC",                             有效方式
  quantity: string; // "0.02700000",                        订单原始数量
  price: string; // "0.07209100",                           订单原始价格
  stopPrice: string; // "0.00000000",                       止盈止损单触发价格
  icebergQuantity: string; // "0.00000000",                 冰山订单数量
  originalClientOrderId: string; // "null",                 原始订单自定义ID(原始订单，指撤单操作的对象。撤单本身被视为另一个订单)
  executionType: ExecutionType; // "NEW",                   本次事件的具体执行类型
  orderStatus: ExecutionType; // "NEW",                     订单的当前状态
  rejectReason: string; // "NONE",                          订单被拒绝的原因
  orderId: number; // 174251668,                            Order ID
  lastTradeQuantity: string; // "0.00000000",               订单末次成交量
  accumulatedQuantity: string; // "0.00000000",             订单累计已成交量
  lastTradePrice: string; // "0.00000000",                  订单末次成交价格
  commission: string; // "0",                               手续费数量
  commissionAsset: any; // null,                            手续费资产类别
  tradeTime: number; // 1530435177265,                      成交时间
  tradeId: number; // 18151                                 成交ID
  maker: boolean; // false                                  maker side
}
