import { Test, TestingModule } from '@nestjs/testing';
import { LookMenuController } from './look_menu.controller';
import { LookMenuService } from './look_menu.service';

describe('LookMenuController', () => {
  let controller: LookMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LookMenuController],
      providers: [LookMenuService],
    }).compile();

    controller = module.get<LookMenuController>(LookMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
