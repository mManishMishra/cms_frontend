import { Test, TestingModule } from '@nestjs/testing';
import { EstimatercalculationController } from './estimatercalculation.controller';
import { EstimatercalculationService } from './estimatercalculation.service';

describe('EstimatercalculationController', () => {
  let controller: EstimatercalculationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstimatercalculationController],
      providers: [EstimatercalculationService],
    }).compile();

    controller = module.get<EstimatercalculationController>(EstimatercalculationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
