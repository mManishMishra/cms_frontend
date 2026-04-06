import { Test, TestingModule } from '@nestjs/testing';
import { ContentManagerController } from './content-manager.controller';
import { ContentManagerService } from './content-manager.service';

describe('ContentManagerController', () => {
  let controller: ContentManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentManagerController],
      providers: [ContentManagerService],
    }).compile();

    controller = module.get<ContentManagerController>(ContentManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
