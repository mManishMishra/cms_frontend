import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCmsExperienceCenterDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description?: string;
}