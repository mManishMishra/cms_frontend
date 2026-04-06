import { Test, TestingModule } from '@nestjs/testing';
import { CmsProductService } from './cms-product.service';

describe('CmsProductService', () => {
  let service: CmsProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CmsProductService],
    }).compile();

    service = module.get<CmsProductService>(CmsProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
