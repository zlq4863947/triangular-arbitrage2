export interface OrderParams {
  symbol: string; // symbol in CCXT format
  amount: number; // amount of base currency
  price: number; // float price in quote currency
  type: 'market' | 'limit'; // order type, 'market', 'limit' or undefined/None/null
  side: 'buy' | 'sell';
  newClientOrderId?: string;
}

export interface TradeFee {
  symbol: string;
  maker: number;
  taker: number;
}
