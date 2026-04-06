import { Test, TestingModule } from '@nestjs/testing';
import { CmsParentChildService } from './cms_parent_child.service';

describe('CmsParentChildService', () => {
  let service: CmsParentChildService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CmsParentChildService],
    }).compile();

    service = module.get<CmsParentChildService>(CmsParentChildService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
