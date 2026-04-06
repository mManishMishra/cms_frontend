import { Test, TestingModule } from '@nestjs/testing';
import { FooterLinkController } from './footer_link.controller';
import { FooterLinkService } from './footer_link.service';

describe('FooterLinkController', () => {
  let controller: FooterLinkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FooterLinkController],
      providers: [FooterLinkService],
    }).compile();

    controller = module.get<FooterLinkController>(FooterLinkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
