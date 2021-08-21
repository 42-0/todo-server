import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { jwtInfo } from '../models/jwt.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // TODO : FORBIDDEN(403) => JWT 변조한 사용자
  async validate(payload: jwtInfo) {
    if (!payload.id) {
      throw new HttpException('UNAUTHORIZED. no id.', HttpStatus.UNAUTHORIZED);
    }
    if (!payload.email) {
      throw new HttpException(
        'UNAUTHORIZED. no email.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (!payload.roles) {
      throw new HttpException(
        'UNAUTHORIZED. no roles.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return payload;
  }
}
