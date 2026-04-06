import { Test, TestingModule } from '@nestjs/testing';
import { LetsConnectService } from './lets-connect.service';

describe('LetsConnectService', () => {
  let service: LetsConnectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LetsConnectService],
    }).compile();

    service = module.get<LetsConnectService>(LetsConnectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
