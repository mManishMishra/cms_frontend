import { Test, TestingModule } from '@nestjs/testing';
import { LookMenuService } from './look_menu.service';

describe('LookMenuService', () => {
  let service: LookMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LookMenuService],
    }).compile();

    service = module.get<LookMenuService>(LookMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
