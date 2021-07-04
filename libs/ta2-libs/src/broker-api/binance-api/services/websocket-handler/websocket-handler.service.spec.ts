import { Test, TestingModule } from '@nestjs/testing';

import { WebsocketHandler } from './websocket-handler.service';

describe('WebsocketHandlerService', () => {
  let service: WebsocketHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebsocketHandler],
    }).compile();

    service = module.get<WebsocketHandler>(WebsocketHandler);
    service.initialize();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
