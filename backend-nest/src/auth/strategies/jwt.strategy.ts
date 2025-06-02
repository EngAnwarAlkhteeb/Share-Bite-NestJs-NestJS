import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../jwt-payload.interface'; // Your JWT payload interface
import { AuthUser } from '../../auth/interfaces/auth-user.interface'; // Your AuthUser interface
import { ConfigService } from '@nestjs/config'; // Used to get JWT_SECRET from .env

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) { // Inject ConfigService
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // Get secret from .env
    });
  }

  async validate(payload: JwtPayload): Promise<AuthUser> {
    // This `payload` is what you signed into the JWT (e.g., { username: user.username, sub: user.id })
    // Return the user data you want attached to `req.user`
    // Make sure payload has email if you need it, based on your jwt-payload.interface.ts
    return { id: payload.sub, username: payload.username, email: payload.email };
  }
}