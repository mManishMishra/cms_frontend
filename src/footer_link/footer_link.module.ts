import { Module } from '@nestjs/common';
import { FooterLinkController } from './footer_link.controller';
import { FooterLinkService } from './footer_link.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FooterLink } from './entities/footer_link.entity';
@Module({
  imports:[TypeOrmModule.forFeature([FooterLink])],
  controllers: [FooterLinkController],
  providers: [FooterLinkService]
})
export class FooterLinkModule {}
