import { Test, TestingModule } from '@nestjs/testing';
import { CmsBlogController } from './cms_blog.controller';
import { CmsBlogService } from './cms_blog.service';

describe('CmsBlogController', () => {
  let controller: CmsBlogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CmsBlogController],
      providers: [CmsBlogService],
    }).compile();

    controller = module.get<CmsBlogController>(CmsBlogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
