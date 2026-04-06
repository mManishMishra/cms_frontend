import { Module } from '@nestjs/common';
import { SeoTagController } from './seo_tag.controller';
import { SeoTagService } from './seo_tag.service';
import { SeoTag } from './entities/seo_tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


 
@Module({
  imports:[TypeOrmModule.forFeature([SeoTag])],
  controllers: [SeoTagController],
  providers: [SeoTagService]
})
export class SeoTagModule {}
