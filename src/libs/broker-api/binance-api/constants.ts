export const brokerConfig = {
  // 所有wss接口baseurl https://binance-docs.github.io/apidocs/futures/cn/#669b9d47c2
  websocketBaseUrl: 'wss://stream.binance.com:9443/ws/',
  websocketCombinedBaseUrl: 'wss://stream.binance.com:9443/stream?streams=',
};

export const WsMarketEndpoints = {
  AllTickers: 'allTickers',
} as const;

export type WsMarketEndpoints = typeof WsMarketEndpoints[keyof typeof WsMarketEndpoints];

export const WsUserEndpoints = {
  UserData: 'userData',
} as const;

export type WsUserEndpoints = typeof WsUserEndpoints[keyof typeof WsUserEndpoints];

export const WsEndpoints = {
  ...WsMarketEndpoints,
  ...WsUserEndpoints,
} as const;

export type WsEndpoints = WsUserEndpoints | WsMarketEndpoints;
