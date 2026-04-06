// src/contact/dto/create-contact.dto.ts

import { IsEmail, IsNotEmpty, IsString, IsBoolean, Length } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @Length(10, 15)
  contactNo: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  query: string;

  @IsBoolean()
  termsAccepted: boolean;
}
