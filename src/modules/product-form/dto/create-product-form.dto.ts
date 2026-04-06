// src/product-form/dto/create-product-form.dto.ts
import { IsString, IsEmail, IsBoolean } from 'class-validator';

export class CreateProductFormDto {
  @IsString()
  fullName: string;

  @IsString()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  designerName: string;

  @IsBoolean()
  termsAccepted: boolean;
}
