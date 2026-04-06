import { Test, TestingModule } from '@nestjs/testing';
import { CmsParentChildController } from './cms_parent_child.controller';
import { CmsParentChildService } from './cms_parent_child.service';

describe('CmsParentChildController', () => {
  let controller: CmsParentChildController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CmsParentChildController],
      providers: [CmsParentChildService],
    }).compile();

    controller = module.get<CmsParentChildController>(CmsParentChildController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
