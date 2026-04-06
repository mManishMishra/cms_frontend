import { Test, TestingModule } from '@nestjs/testing';
import { ManageJobService } from './manage_job.service';

describe('ManageJobService', () => {
  let service: ManageJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageJobService],
    }).compile();

    service = module.get<ManageJobService>(ManageJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
