import { Test, TestingModule } from '@nestjs/testing';
import { ContentManagerService } from './content-manager.service';

describe('ContentManagerService', () => {
  let service: ContentManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentManagerService],
    }).compile();

    service = module.get<ContentManagerService>(ContentManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
