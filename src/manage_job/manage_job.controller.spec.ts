import { Test, TestingModule } from '@nestjs/testing';
import { ManageJobController } from './manage_job.controller';
import { ManageJobService } from './manage_job.service';

describe('ManageJobController', () => {
  let controller: ManageJobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageJobController],
      providers: [ManageJobService],
    }).compile();

    controller = module.get<ManageJobController>(ManageJobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
