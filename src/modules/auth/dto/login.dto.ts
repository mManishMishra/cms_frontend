// src/auth/dto/login.dto.ts

import { IsString, IsNotEmpty, MinLength, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
    @ApiProperty({ description: 'The username of the user (optional, can use email instead)', example: 'johndoe' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    username?: string;

    @ApiProperty({ description: 'The email of the user (optional, can use username instead)', example: 'john@example.com' })
    @IsEmail({}, { message: 'Invalid email format.' })
    @IsOptional()
    @IsNotEmpty()
    email?: string;

    @ApiProperty({ description: 'The password of the user', example: 'password123', minLength: 6 })
    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be at least 6 characters long.' })
    password: string;
}
