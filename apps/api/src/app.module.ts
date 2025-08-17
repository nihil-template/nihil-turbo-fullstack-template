import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { serverConfig } from '@repo/config/server.config';

@Module({
  imports: [
    ThrottlerModule.forRoot([ {
      ttl: 60000, // 1분
      limit: 60, // 60회
    }, ]),
    UsersModule,
    AuthModule,
    PrismaModule,
    MailerModule.forRoot({
      transport: {
        host: serverConfig.nodemailer.host,
        port: serverConfig.nodemailer.port,
        secure: serverConfig.nodemailer.secure,
        auth: {
          user: serverConfig.nodemailer.auth.user,
          pass: serverConfig.nodemailer.auth.pass,
        },
      },
      defaults: {
        from: `"No Reply" <${serverConfig.nodemailer.auth.user}>`,
      },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
