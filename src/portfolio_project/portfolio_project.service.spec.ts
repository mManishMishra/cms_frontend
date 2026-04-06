import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioProjectService } from './portfolio_project.service';

describe('PortfolioProjectService', () => {
  let service: PortfolioProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortfolioProjectService],
    }).compile();

    service = module.get<PortfolioProjectService>(PortfolioProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
