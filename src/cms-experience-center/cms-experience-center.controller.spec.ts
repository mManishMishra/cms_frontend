import { Test, TestingModule } from '@nestjs/testing';
import { CmsExperienceCenterController } from './cms-experience-center.controller';
import { CmsExperienceCenterService } from './cms-experience-center.service';

describe('CmsExperienceCenterController', () => {
  let controller: CmsExperienceCenterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CmsExperienceCenterController],
      providers: [CmsExperienceCenterService],
    }).compile();

    controller = module.get<CmsExperienceCenterController>(CmsExperienceCenterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
