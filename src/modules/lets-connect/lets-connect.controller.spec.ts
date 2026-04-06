import { Test, TestingModule } from '@nestjs/testing';
import { LetsConnectController } from './lets-connect.controller';
import { LetsConnectService } from './lets-connect.service';

describe('LetsConnectController', () => {
  let controller: LetsConnectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LetsConnectController],
      providers: [LetsConnectService],
    }).compile();

    controller = module.get<LetsConnectController>(LetsConnectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
