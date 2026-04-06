import { Test, TestingModule } from '@nestjs/testing';
import { ProductFormController } from './product-form.controller';
import { ProductFormService } from './product-form.service';

describe('ProductFormController', () => {
  let controller: ProductFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductFormController],
      providers: [ProductFormService],
    }).compile();

    controller = module.get<ProductFormController>(ProductFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
