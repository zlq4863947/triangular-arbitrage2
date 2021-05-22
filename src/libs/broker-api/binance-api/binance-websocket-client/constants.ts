export const brokerConfig = {
  // 所有wss接口baseurl https://binance-docs.github.io/apidocs/futures/cn/#669b9d47c2
  websocketBaseUrl: 'wss://stream.binance.com:9443/ws/',
  websocketCombinedBaseUrl: 'wss://stream.binance.com:9443/stream?streams=',
};

export enum WsEndpoints {
  AllTickers = 'allTickers',
}
