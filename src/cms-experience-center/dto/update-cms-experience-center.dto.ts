import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateCmsExperienceCenterDto } from './create-cms-experience-center.dto';

export class UpdateCmsExperienceCenterDto extends PartialType(CreateCmsExperienceCenterDto) {
  @IsOptional()
  @IsString()
  image?: string;
}