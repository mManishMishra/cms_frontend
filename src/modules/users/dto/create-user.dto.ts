// src/users/dto/create-user.dto.ts

import {
    IsString,
    IsNotEmpty,
    IsEmail,
    IsOptional,
    IsEnum,
    IsPhoneNumber,
    IsDate,
    IsArray,
    IsBoolean,
    IsIn,
    IsISO8601,
    Length,
    MinLength,
    IsNumber,
    IsInt,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiPropertyOptional({ description: 'The user ID (optional)' })
    @IsOptional()
    @IsInt()
    id?: number;

    @ApiProperty({ description: 'The username of the user', example: 'john_doe' })
    @IsString()
    @IsNotEmpty()
    @MinLength(4, { message: 'Username must be at least 4 characters long.' })
    username: string;

    @ApiProperty({ description: 'The password of the user', example: 'password123' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be at least 6 characters long.' })
    password: string;

    @ApiProperty({ description: 'The email of the user', example: 'john@example.com' })
    @IsEmail({}, { message: 'Invalid email format.' })
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'The first name of the user', example: 'John' })
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ description: 'The last name of the user', example: 'Doe' })
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ description: 'The date of birth in ISO 8601 format', example: '1990-01-01' })
    @IsISO8601({}, { message: 'Date of birth must be in ISO 8601 date format.' })
    dateOfBirth: Date;

    @ApiProperty({
        description: 'The gender of the user',
        example: 'Male',
        enum: ['Male', 'Female', 'Other'],
    })
    @IsEnum(['Male', 'Female', 'Other'], {
        message: 'Gender must be either Male, Female, or Other.',
    })
    gender: 'Male' | 'Female' | 'Other';

    @ApiProperty({ description: 'The primary phone number', example: '+1234567890' })
    @IsPhoneNumber('IN', { message: 'Invalid phone number.' })
    @IsNotEmpty()
    @Length(9, 13, { message: 'Phone number must be between 9 and 13 characters long.' })
    phoneNumber: string;

    @ApiPropertyOptional({ description: 'An alternate phone number', example: '+0987654321' })
    @IsOptional()
    @IsPhoneNumber('IN', { message: 'Invalid alternate phone number.' })
    @Length(9, 13, { message: 'Alternate phone number must be between 9 and 13 characters long.' })
    alternatePhoneNumber?: string;

    @ApiProperty({ description: 'The user address', example: '123 Main St' })
    @IsString()
    @IsOptional()
    address: string;

    @ApiProperty({ description: 'The user city', example: 'New York' })
    @IsString()
    @IsOptional()
    city: string;

    @ApiProperty({ description: 'The user state', example: 'NY' })
    @IsString()
    @IsOptional()
    state: string;

    @ApiProperty({ description: 'The user country', example: 'USA' })
    @IsString()
    @IsOptional()
    country: string;

    @ApiProperty({ description: 'The postal code', example: '10001' })
    @IsString()
    @Length(5, 10, {
        message: 'Postal code must be between 5 and 10 characters long.',
    })
    postalCode: string;

    @ApiProperty({ description: 'The preferred currency of the user', example: 'USD' })
    @IsString()
    @IsOptional()
    preferredCurrency: string;

    @ApiProperty({ description: 'The language preference of the user', example: 'English' })
    @IsString()
    @IsOptional()
    languagePreference: string;

    @ApiPropertyOptional({
        description: 'The purchase history of the user (array of property IDs)',
        example: ['property_123', 'property_456'],
    })
    @IsArray()
    @IsOptional()
    purchaseHistory?: string[];

    @ApiPropertyOptional({
        description: 'The favorite properties of the user (array of property IDs)',
        example: ['property_789', 'property_654'],
    })
    @IsArray()
    @IsOptional()
    favoriteProperties?: string[];

    @ApiPropertyOptional({ description: 'Whether the user is verified (defaults to false)', example: false })
    @IsBoolean()
    @IsOptional() // Optional because the default in the entity is false
    isVerified?: boolean;

    @ApiPropertyOptional({
        description: 'The role of the user (User or Admin, defaults to User)',
        example: 'User',
        enum: ['User', 'Admin'],
    })
    @IsIn(['User', 'Admin'], { message: 'Role must be either User or Admin.' })
    @IsOptional() // Optional because the default in the entity is 'User'
    role?: string;

    @ApiPropertyOptional({
        description: 'Saved payment methods (array of payment method IDs)',
        example: ['method_001', 'method_002'],
    })
    @IsArray()
    @IsOptional()
    savedPaymentMethods?: string[];

    @ApiPropertyOptional({
        description: 'The creation timestamp of the user (auto-generated)',
        example: '2024-09-25T15:45:00.000Z',
    })
    @IsDate()
    @IsOptional()
    createdAt?: Date;

    @ApiPropertyOptional({
        description: 'The last updated timestamp of the user (auto-updated)',
        example: '2024-09-25T16:00:00.000Z',
    })
    @IsDate()
    @IsOptional()
    updatedAt?: Date;
}
