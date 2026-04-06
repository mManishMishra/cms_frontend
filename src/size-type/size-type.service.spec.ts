import { Test, TestingModule } from '@nestjs/testing';
import { SizeTypeService } from './size-type.service';

describe('SizeTypeService', () => {
  let service: SizeTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SizeTypeService],
    }).compile();

    service = module.get<SizeTypeService>(SizeTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
