import { Test, TestingModule } from '@nestjs/testing';
import { PropertySubTypeController } from './property-sub-type.controller';
import { PropertySubTypeService } from './property-sub-type.service';

describe('PropertySubTypeController', () => {
  let controller: PropertySubTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertySubTypeController],
      providers: [PropertySubTypeService],
    }).compile();

    controller = module.get<PropertySubTypeController>(PropertySubTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
