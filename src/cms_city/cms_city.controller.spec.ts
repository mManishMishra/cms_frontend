import { Test, TestingModule } from '@nestjs/testing';
import { CmsCityController } from './cms_city.controller';
import { CmsCityService } from './cms_city.service';

describe('CmsCityController', () => {
  let controller: CmsCityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CmsCityController],
      providers: [CmsCityService],
    }).compile();

    controller = module.get<CmsCityController>(CmsCityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
