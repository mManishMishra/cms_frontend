import { Test, TestingModule } from '@nestjs/testing';
import { ProductFormService } from './product-form.service';

describe('ProductFormService', () => {
  let service: ProductFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductFormService],
    }).compile();

    service = module.get<ProductFormService>(ProductFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
