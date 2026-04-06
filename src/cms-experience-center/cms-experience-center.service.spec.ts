import { Test, TestingModule } from '@nestjs/testing';
import { CmsExperienceCenterService } from './cms-experience-center.service';

describe('CmsExperienceCenterService', () => {
  let service: CmsExperienceCenterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CmsExperienceCenterService],
    }).compile();

    service = module.get<CmsExperienceCenterService>(CmsExperienceCenterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
