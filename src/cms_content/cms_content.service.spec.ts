import { Test, TestingModule } from '@nestjs/testing';
import { CmsContentService } from './cms_content.service';

describe('CmsContentService', () => {
  let service: CmsContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CmsContentService],
    }).compile();

    service = module.get<CmsContentService>(CmsContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
