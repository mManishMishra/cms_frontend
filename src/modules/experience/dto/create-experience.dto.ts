// src/experience/dto/create-experience.dto.ts
import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsBoolean()
  whatsappUpdates?: boolean;

  @IsString()
  propertyName: string;

  @IsBoolean()
  termsAccepted: boolean;
}
