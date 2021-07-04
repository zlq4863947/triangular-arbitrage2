import { Controller, Get } from '@nestjs/common';

import { ProCliAppService } from './pro-cli-app.service';

@Controller()
export class ProCliAppController {
  constructor(private readonly proCliAppService: ProCliAppService) {}

  @Get()
  getHello(): string {
    return this.proCliAppService.getHello();
  }
}
