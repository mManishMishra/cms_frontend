import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateContentManagerDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  tags?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;
}
