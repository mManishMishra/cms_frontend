import { IsString, IsEmail, IsBoolean, IsDateString } from 'class-validator';

export class CreateLetsConnectDto {
  @IsString()
  fullName: string;

  @IsString()
  contact: string;

  @IsEmail()
  email: string;

  @IsString()
  place: string;

  @IsString()
  query?: string;

  @IsBoolean()
  termsAndConditions: boolean;
}
