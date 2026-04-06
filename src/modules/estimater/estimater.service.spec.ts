import { Test, TestingModule } from '@nestjs/testing';
import { EstimaterService } from './estimater.service';

describe('EstimaterService', () => {
  let service: EstimaterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstimaterService],
    }).compile();

    service = module.get<EstimaterService>(EstimaterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
