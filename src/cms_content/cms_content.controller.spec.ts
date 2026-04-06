import { Test, TestingModule } from '@nestjs/testing';
import { CmsContentController } from './cms_content.controller';
import { CmsContentService } from './cms_content.service';

describe('CmsContentController', () => {
  let controller: CmsContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CmsContentController],
      providers: [CmsContentService],
    }).compile();

    controller = module.get<CmsContentController>(CmsContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
