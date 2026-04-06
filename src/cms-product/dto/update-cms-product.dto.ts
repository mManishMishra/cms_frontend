import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { CreateCmsProductDto } from './create-cms-product.dto';

export class UpdateCmsProductDto extends PartialType(CreateCmsProductDto) {
  @IsOptional()
  @IsString()
  image?: string;
}