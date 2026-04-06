import { PartialType } from '@nestjs/swagger';
import { CreateCmsGalleryDesignDto } from './create-cms-gallery-design.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCmsGalleryDesignDto extends PartialType(CreateCmsGalleryDesignDto) {
    @IsOptional()
    @IsString()
    image?: string;
  }
