import { Test, TestingModule } from '@nestjs/testing';
import { CmsGalleryDesignService } from './cms-gallery-design.service';

describe('CmsGalleryDesignService', () => {
  let service: CmsGalleryDesignService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CmsGalleryDesignService],
    }).compile();

    service = module.get<CmsGalleryDesignService>(CmsGalleryDesignService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
