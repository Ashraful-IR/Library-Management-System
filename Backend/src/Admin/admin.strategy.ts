import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'library-secret',
    });
  }

  // Here we just return the payload as "user"
  // { sub, email, role } – works for both admin and librarian
  async validate(payload: { sub: number; email: string; role: string }) {
    return payload;
  }
}
