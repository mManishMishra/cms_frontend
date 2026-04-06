import { Test, TestingModule } from '@nestjs/testing';
import { SizeTypeController } from './size-type.controller';
import { SizeTypeService } from './size-type.service';

describe('SizeTypeController', () => {
  let controller: SizeTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SizeTypeController],
      providers: [SizeTypeService],
    }).compile();

    controller = module.get<SizeTypeController>(SizeTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
