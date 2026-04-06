import { Test, TestingModule } from '@nestjs/testing';
import { CmsCityService } from './cms_city.service';

describe('CmsCityService', () => {
  let service: CmsCityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CmsCityService],
    }).compile();

    service = module.get<CmsCityService>(CmsCityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
