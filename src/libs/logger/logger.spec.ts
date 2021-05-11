import { Test, TestingModule } from '@nestjs/testing';

import { Logger } from './logger';

describe('Logger', () => {
  let service: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Logger],
    }).compile();

    service = module.get<Logger>(Logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
