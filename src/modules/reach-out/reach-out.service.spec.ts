import { Test, TestingModule } from '@nestjs/testing';
import { ReachOutService } from './reach-out.service';

describe('ReachOutService', () => {
  let service: ReachOutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReachOutService],
    }).compile();

    service = module.get<ReachOutService>(ReachOutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
