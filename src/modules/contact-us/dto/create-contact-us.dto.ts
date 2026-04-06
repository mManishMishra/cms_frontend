// src/contact-us/dto/create-contact-us.dto.ts
import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class CreateContactUsDto {
  @IsString()
  fullName: string;

  @IsString()
  contactNo: string;

  @IsEmail()
  email: string;

  @IsString()
  place: string;

  @IsOptional()
  @IsString()
  query?: string;

  @IsBoolean()
  termsAndConditions: boolean;
}
