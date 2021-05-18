import { Injectable } from '@nestjs/common';

@Injectable()
export class BinanceApiService {
  getApi() {
    console.log('get api');
  }
}
