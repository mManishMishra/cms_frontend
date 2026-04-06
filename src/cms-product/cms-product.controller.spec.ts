import { Test, TestingModule } from '@nestjs/testing';
import { CmsProductController } from './cms-product.controller';
import { CmsProductService } from './cms-product.service';

describe('CmsProductController', () => {
  let controller: CmsProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CmsProductController],
      providers: [CmsProductService],
    }).compile();

    controller = module.get<CmsProductController>(CmsProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
