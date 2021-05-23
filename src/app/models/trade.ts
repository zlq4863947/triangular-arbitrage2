/**
 * 三角组合的边
 */
export interface Edge {
  pair: string;
  fromAsset: string;
  toAsset: string;
  // 交易方向
  side: 'sell' | 'buy';
  // 最佳价格
  price: number;
  // 最佳数量
  quantity: number;
}

/**
 * 三角组合
 */
export interface Triangle {
  // 三角组合唯一id（例:btc-bnb-bcd）
  id: string;
  edges: Edge[];
  // 利率
  rate: number;
  // 时间戳
  time: number;
  logs: TriangleRateLogs;
}

export interface ABCAssetName {
  aAssetName: string;
  bAssetName: string;
  cAssetName: string;
}

export interface TriangleRate {
  rate: number;
  logs: TriangleRateLogs;
}

export interface TriangleRateLogs {
  aRate: string;
  bRate: string;
  cRate: string;
}
