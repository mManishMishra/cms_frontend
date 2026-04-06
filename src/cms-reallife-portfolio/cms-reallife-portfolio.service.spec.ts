import { Test, TestingModule } from '@nestjs/testing';
import { CmsReallifePortfolioService } from './cms-reallife-portfolio.service';

describe('CmsReallifePortfolioService', () => {
  let service: CmsReallifePortfolioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CmsReallifePortfolioService],
    }).compile();

    service = module.get<CmsReallifePortfolioService>(CmsReallifePortfolioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
