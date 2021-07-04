import { Injectable } from '@nestjs/common';

@Injectable()
export class ProCliAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
