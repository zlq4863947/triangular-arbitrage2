import { Injectable } from '@nestjs/common';

import { BinanceRestClient } from './binance-rest-client/binance-rest-client.service';
import { BinanceWebsocketClient } from './binance-websocket-client/binance-websocket-client.service';

@Injectable()
export class BinanceApiService {
  constructor(public ws: BinanceWebsocketClient, public rest: BinanceRestClient) {}
}
