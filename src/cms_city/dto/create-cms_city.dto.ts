import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCmsCityDto {
  @IsString()
  @IsNotEmpty()
  city_type: string;

  @IsString()
  @IsNotEmpty()
  main_title: string;

  @IsString()
  @IsOptional()
  main_description?: string;

  @IsString()
  @IsOptional()
  side_title?: string;

  @IsString()
  @IsOptional()
  side_description?: string;
}