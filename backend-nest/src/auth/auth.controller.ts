// src/auth/auth.controller.ts
import {
  Controller,
  Request,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard'; 
import { CreateUserDto } from '../user/dto/create-user.dto'; // User registration DTO
import { UserService } from '../user/user.service'; // To use for registration
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto'; // New DTO for login

@ApiTags('Authentication') // Tag for Swagger documentation
@Controller('auth') // Base route for authentication
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService, // Inject UserService for registration
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED) // Return 201 Created on success
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (e.g., invalid email, weak password).',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict (User/username already exists).',
  })
  async register(@Body() createUserDto: CreateUserDto) {
    // The password hashing and user existence check are now handled inside UserService.create
    const user = await this.userService.create(createUserDto);
    // After user creation, generate a token for immediate login
    const token = await this.authService.login(user);
    return { success: true, token: token.access_token }; // Match old response structure
  }

  @UseGuards(LocalAuthGuard) // This guard triggers LocalStrategy.validate()
  @Post('login')
  @ApiOperation({ summary: 'Log in an existing user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in, returns JWT token.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized (Invalid credentials).',
  })
  async login(@Request() req, @Body() loginUserDto: LoginUserDto) {
    // 'req.user' is populated by LocalAuthGuard after successful validation
    const token = await this.authService.login(req.user);
    return { success: true, token: token.access_token }; // Match old response structure
  }
}
