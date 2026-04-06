import { Test, TestingModule } from '@nestjs/testing';
import { PropertySubTypeService } from './property-sub-type.service';

describe('PropertySubTypeService', () => {
  let service: PropertySubTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertySubTypeService],
    }).compile();

    service = module.get<PropertySubTypeService>(PropertySubTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
