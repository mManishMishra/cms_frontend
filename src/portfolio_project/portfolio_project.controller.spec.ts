import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioProjectController } from './portfolio_project.controller';
import { PortfolioProjectService } from './portfolio_project.service';

describe('PortfolioProjectController', () => {
  let controller: PortfolioProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfolioProjectController],
      providers: [PortfolioProjectService],
    }).compile();

    controller = module.get<PortfolioProjectController>(PortfolioProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
