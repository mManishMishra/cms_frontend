import { Test, TestingModule } from '@nestjs/testing';
import { CmsReallifePortfolioController } from './cms-reallife-portfolio.controller';
import { CmsReallifePortfolioService } from './cms-reallife-portfolio.service';

describe('CmsReallifePortfolioController', () => {
  let controller: CmsReallifePortfolioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CmsReallifePortfolioController],
      providers: [CmsReallifePortfolioService],
    }).compile();

    controller = module.get<CmsReallifePortfolioController>(CmsReallifePortfolioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
