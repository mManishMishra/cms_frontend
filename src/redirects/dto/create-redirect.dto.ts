import { IsString, IsNumber, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateRedirectDto {
  @IsString()
  @IsNotEmpty()
  old_url: string;

  @IsString()
  @IsNotEmpty()
  new_url: string;

  @IsNumber()
  @IsOptional()
  status_code?: number;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}