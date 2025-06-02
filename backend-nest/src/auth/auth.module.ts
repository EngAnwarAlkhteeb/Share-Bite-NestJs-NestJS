// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module'; // IMPORTANT: Import UserModule
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
// import { jwtConstants } from './constants'; // You might move this to ConfigService
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config'; // For environment variables

@Module({
  imports: [
    UserModule, // Ensure UserModule is imported so AuthService can use UserService
    PassportModule,
    JwtModule.registerAsync({
      // Use registerAsync to inject ConfigService
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Get secret from .env
        signOptions: { expiresIn: '60m' }, // Token expiration
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService], // Export AuthService if other modules need to use it
})
export class AuthModule {}
