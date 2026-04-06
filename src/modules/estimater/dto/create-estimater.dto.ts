// src/estimater/dto/create-estimater.dto.ts

import { IsEmail, IsNotEmpty, IsString, IsNumber, Length, IsJSON } from 'class-validator';

export class CreateEstimaterDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @Length(10, 10, { message: 'Mobile number must be 10 digits' })
    mobile: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    query: string;
    
    @IsString()
    home: string;

    @IsNumber()
    bedrooms: number;

    @IsNumber()
    bathrooms: number;

    @IsNumber()
    living: number;

    @IsNumber()
    kitchen: number;

    @IsNumber()
    total_price: any;
}
