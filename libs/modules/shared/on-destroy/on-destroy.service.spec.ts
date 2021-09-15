import { Test, TestingModule } from '@nestjs/testing';

import { OnDestroyService } from './on-destroy.service';

describe('OnDestroyService', () => {
  let service: OnDestroyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnDestroyService],
    }).compile();

    service = module.get<OnDestroyService>(OnDestroyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
