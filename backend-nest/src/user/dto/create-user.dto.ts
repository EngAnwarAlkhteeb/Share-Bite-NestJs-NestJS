// src/user/dto/create-user.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: "User's chosen username/name",
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty({ message: 'Username cannot be empty' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @MaxLength(50, { message: 'Username cannot be longer than 50 characters' })
  username: string; 

  @ApiProperty({
    description: "User's email address",
    example: 'john.doe@example.com',
  })
  @IsString()
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @ApiProperty({
    description: "User's password (min 8 characters)",
    example: 'SecurePassword123',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(8, {
    message: 'Please enter a strong password (at least 8 characters)',
  })
  password: string;
}
