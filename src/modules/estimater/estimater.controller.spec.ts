import { Test, TestingModule } from '@nestjs/testing';
import { EstimaterController } from './estimater.controller';
import { EstimaterService } from './estimater.service';

describe('EstimaterController', () => {
  let controller: EstimaterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstimaterController],
      providers: [EstimaterService],
    }).compile();

    controller = module.get<EstimaterController>(EstimaterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
