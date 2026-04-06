import { Test, TestingModule } from '@nestjs/testing';
import { FooterLinkService } from './footer_link.service';

describe('FooterLinkService', () => {
  let service: FooterLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FooterLinkService],
    }).compile();

    service = module.get<FooterLinkService>(FooterLinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
