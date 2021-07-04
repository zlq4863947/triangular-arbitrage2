import { Test, TestingModule } from '@nestjs/testing';

import { ProCliAppController } from './pro-cli-app.controller';
import { ProCliAppService } from './pro-cli-app.service';

describe('ProCliAppController', () => {
  let proCliAppController: ProCliAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProCliAppController],
      providers: [ProCliAppService],
    }).compile();

    proCliAppController = app.get<ProCliAppController>(ProCliAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(proCliAppController.getHello()).toBe('Hello World!');
    });
  });
});
