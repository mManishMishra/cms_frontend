import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCmsGalleryDesignDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  room_dimension: string;
}