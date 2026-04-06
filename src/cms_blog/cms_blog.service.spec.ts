import { Test, TestingModule } from '@nestjs/testing';
import { CmsBlogService } from './cms_blog.service';

describe('CmsBlogService', () => {
  let service: CmsBlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CmsBlogService],
    }).compile();

    service = module.get<CmsBlogService>(CmsBlogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
