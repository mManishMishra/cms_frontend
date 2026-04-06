import { Test, TestingModule } from '@nestjs/testing';
import { CmsGalleryDesignController } from './cms-gallery-design.controller';
import { CmsGalleryDesignService } from './cms-gallery-design.service';

describe('CmsGalleryDesignController', () => {
  let controller: CmsGalleryDesignController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CmsGalleryDesignController],
      providers: [CmsGalleryDesignService],
    }).compile();

    controller = module.get<CmsGalleryDesignController>(CmsGalleryDesignController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
