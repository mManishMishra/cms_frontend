import { Test, TestingModule } from '@nestjs/testing';
import { SeoTagService } from './seo_tag.service';

describe('SeoTagService', () => {
  let service: SeoTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeoTagService],
    }).compile();

    service = module.get<SeoTagService>(SeoTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
