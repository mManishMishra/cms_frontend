import { Test, TestingModule } from '@nestjs/testing';
import { ReachOutController } from './reach-out.controller';
import { ReachOutService } from './reach-out.service';

describe('ReachOutController', () => {
  let controller: ReachOutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReachOutController],
      providers: [ReachOutService],
    }).compile();

    controller = module.get<ReachOutController>(ReachOutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
