import { Test, TestingModule } from '@nestjs/testing';
import { SeoTagController } from './seo_tag.controller';

describe('SeoTagController', () => {
  let controller: SeoTagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeoTagController],
    }).compile();

    controller = module.get<SeoTagController>(SeoTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
