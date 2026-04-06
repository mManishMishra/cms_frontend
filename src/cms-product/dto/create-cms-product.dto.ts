import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCmsProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  style: string;

  @IsNotEmpty()
  @IsString()
  room_dimension: string;

  @IsNotEmpty()
  @IsString()
  rating_count: number;

  @IsNotEmpty()
  @IsString()
  rating: number;
}