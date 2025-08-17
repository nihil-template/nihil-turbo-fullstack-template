import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { serverConfig } from '@repo/config/server.config';
import { UserRole } from '@repo/prisma';

export interface JwtPayload {
  userId: string;
  emlAddr: string;
  userNm: string;
  userRole: UserRole;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request): string | null => {
          return request?.cookies?.accessToken as string;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: serverConfig.jwt.access.secret,
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return {
      userId: payload.userId,
      emlAddr: payload.emlAddr,
      userNm: payload.userNm,
      userRole: payload.userRole,
    };
  }
}
