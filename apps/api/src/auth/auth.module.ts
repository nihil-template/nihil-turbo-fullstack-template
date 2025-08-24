import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { UsersModule } from '@/users/users.module';
import { serverConfig } from '@repo/config/server.config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    MailerModule,
    PassportModule.register({ defaultStrategy: 'jwt', }),
    JwtModule.register({
      secret: serverConfig.jwt.access.secret,
      signOptions: {
        expiresIn: serverConfig.jwt.access.expiresIn,
      },
    }),
  ],
  controllers: [ AuthController, ],
  providers: [ AuthService, JwtStrategy, ],
})
export class AuthModule { }
