# NestJS API 개발 가이드

## 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [프로젝트 구조](#프로젝트-구조)
3. [설치 및 실행](#설치-및-실행)
4. [API 구성 가이드](#api-구성-가이드)
5. [Swagger 설정](#swagger-설정)
6. [인증 시스템](#인증-시스템)
7. [데이터베이스 설정](#데이터베이스-설정)
8. [에러 처리](#에러-처리)
9. [보안 설정](#보안-설정)
10. [모니터링 및 로깅](#모니터링-및-로깅)
11. [배포 가이드](#배포-가이드)

## 프로젝트 개요

이 프로젝트는 NestJS 기반의 RESTful API 서버로, 다음과 같은 특징을 가지고 있습니다:

- **TypeScript** 기반 개발
- **Prisma ORM**을 사용한 데이터베이스 관리
- **JWT 기반 인증** 시스템
- **Swagger** API 문서화
- **Rate Limiting** 적용
- **Cookie 기반 세션 관리**
- **이메일 발송** 기능

### 주요 기술 스택

- **Framework**: NestJS 11.x
- **Language**: TypeScript 5.x
- **Database**: PostgreSQL + Prisma
- **Authentication**: JWT + Passport
- **Documentation**: Swagger/OpenAPI
- **Validation**: Zod
- **Email**: Nodemailer
- **Security**: bcrypt, cookie-parser

## 프로젝트 구조

```
apps/api/
├── src/
│   ├── auth/                 # 인증 관련 모듈
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── jwt.strategy.ts
│   │   └── jwt-auth.guard.ts
│   ├── users/                # 사용자 관련 모듈
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── prisma/               # 데이터베이스 모듈
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   ├── app.module.ts         # 루트 모듈
│   ├── main.ts              # 애플리케이션 진입점
│   ├── swagger.config.ts    # Swagger 설정
│   ├── success.interceptor.ts # 성공 응답 인터셉터
│   └── http-exception.filter.ts # 에러 처리 필터
├── prisma/
│   ├── schema.prisma        # 데이터베이스 스키마
│   └── migrations/          # 마이그레이션 파일들
├── package.json
├── tsconfig.json
└── nest-cli.json
```

## 설치 및 실행

### 1. 의존성 설치

```bash
cd apps/api
pnpm install
```

### 2. 설정 관리

이 프로젝트는 `@repo/config` 패키지를 통해 중앙화된 설정 관리를 사용합니다.

#### 환경 변수 설정

`.env` 파일을 생성하고 데이터베이스 연결 정보만 설정합니다:

```env
# 데이터베이스 (Prisma에서만 사용)
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

#### 서버 설정 파일

`packages/config/server.config.ts`에서 서버 관련 설정을 관리합니다:

```typescript
import { commonConfig } from './common.config';

export const serverConfig = {
  port: 8000,
  host: 'localhost',
  swagger: {
    docsName: `${commonConfig.appName} API 문서`,
    docsDescription: `${commonConfig.appName} API 문서`,
    docsVersion: commonConfig.appVersion,
    path: 'swagger/docs',
  },
  jwt: {
    access: {
      secret: 'your-access-token-secret-here',
      expiresIn: '1h',
    },
    refresh: {
      secret: 'your-refresh-token-secret-here',
      expiresIn: '30d',
    },
  },
  nodemailer: {
    host: 'smtp.naver.com',
    port: 587,
    secure: false,
    auth: {
      user: 'your-email@naver.com',
      pass: 'your-app-password',
    },
  },
};
```

#### 설정 사용법

NestJS 애플리케이션에서 설정을 사용할 때:

```typescript
// main.ts
import { serverConfig } from '@repo/config/server.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 서버 설정 사용
  await app.listen(serverConfig.port, serverConfig.host);
  console.log(
    `애플리케이션이 ${serverConfig.host}:${serverConfig.port}에서 실행 중입니다.`,
  );
}

// swagger.config.ts
import { serverConfig } from '@repo/config/server.config';

export const swaggerConfig = new DocumentBuilder()
  .setTitle(serverConfig.swagger.docsName)
  .setDescription(serverConfig.swagger.docsDescription)
  .setVersion(serverConfig.swagger.docsVersion)
  .build();
```

### 3. 데이터베이스 설정

```bash
# Prisma 클라이언트 생성
pnpm db:generate

# 마이그레이션 실행
pnpm db:migrate

# Prisma Studio 실행 (선택사항)
pnpm db:studio
```

### 4. 개발 서버 실행

```bash
# 개발 모드
pnpm dev

# 프로덕션 빌드
pnpm build
pnpm start:prod
```

## API 구성 가이드

### 1. 모듈 구조

각 기능별로 모듈을 분리하여 관리합니다:

```typescript
// users.module.ts 예시
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

### 2. 컨트롤러 작성

```typescript
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: '사용자 목록 조회',
    description: '모든 사용자 목록을 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '조회 성공' })
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }
}
```

### 3. 서비스 작성

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.userInfo.findMany({
      where: { actvtnYn: true },
      select: {
        userId: true,
        emlAddr: true,
        userNm: true,
        userRole: true,
        proflImg: true,
        userBiogp: true,
        lastLgnDt: true,
        crtDt: true,
      },
    });
  }
}
```

### 4. DTO 작성

```typescript
import { z } from 'zod';

export const CreateUserDto = z.object({
  emlAddr: z.string().email('유효한 이메일을 입력하세요'),
  userNm: z.string().min(2, '사용자명은 2자 이상이어야 합니다'),
  encptPswd: z.string().min(6, '비밀번호는 6자 이상이어야 합니다'),
});

export type CreateUserDto = z.infer<typeof CreateUserDto>;
```

## Swagger 설정

### 1. 기본 설정

```typescript
// swagger.config.ts
import { DocumentBuilder } from '@nestjs/swagger';
import { serverConfig } from '@repo/config/server.config';

export const swaggerConfig = new DocumentBuilder()
  .setTitle(serverConfig.swagger.docsName)
  .setDescription(serverConfig.swagger.docsDescription)
  .setVersion(serverConfig.swagger.docsVersion)
  .addTag('auth', '인증 관련 API')
  .addTag('users', '사용자 관련 API')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'JWT 토큰을 입력하세요.',
      in: 'header',
    },
    'JWT-auth',
  )
  .build();
```

### 2. 컨트롤러에서 Swagger 데코레이터 사용

```typescript
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @ApiOperation({
    summary: '로그인',
    description: '사용자 로그인을 처리하고, 인증 토큰을 쿠키에 설정합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        data: {
          type: 'object',
          properties: {
            user: { $ref: '#/components/schemas/User' },
            message: { type: 'string', example: '로그인 성공' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
  })
  @Post('signin')
  async signIn(@Body() signInData: SignInDto) {
    return this.authService.signIn(signInData);
  }
}
```

### 3. 스키마 정의

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: '사용자 ID',
    example: 'uuid-string',
  })
  userId: string;

  @ApiProperty({
    description: '이메일 주소',
    example: 'user@example.com',
  })
  emlAddr: string;

  @ApiProperty({
    description: '사용자명',
    example: '홍길동',
  })
  userNm: string;
}
```

## 인증 시스템

### 1. JWT 전략 설정

```typescript
// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { serverConfig } from '@repo/config/server.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: serverConfig.jwt.access.secret,
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      emlAddr: payload.emlAddr,
      userRole: payload.userRole,
    };
  }
}
```

### 2. 가드 설정

```typescript
// jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

### 3. 인증 서비스

```typescript
// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInData: SignInDto) {
    const user = await this.prisma.userInfo.findUnique({
      where: { emlAddr: signInData.emlAddr },
      include: { UserCertInfo: true },
    });

    if (!user || !user.UserCertInfo) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
    }

    const isPasswordValid = await bcrypt.compare(
      signInData.encptPswd,
      user.UserCertInfo.encptPswd,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
    }

    const payload = {
      sub: user.userId,
      emlAddr: user.emlAddr,
      userRole: user.userRole,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: serverConfig.jwt.access.secret,
      expiresIn: serverConfig.jwt.access.expiresIn,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: serverConfig.jwt.refresh.secret,
      expiresIn: serverConfig.jwt.refresh.expiresIn,
    });

    // 리프레시 토큰 저장
    await this.prisma.userCertInfo.update({
      where: { userId: user.userId },
      data: { reshToken: refreshToken },
    });

    return {
      user: {
        userId: user.userId,
        emlAddr: user.emlAddr,
        userNm: user.userNm,
        userRole: user.userRole,
      },
      accessToken,
      refreshToken,
    };
  }
}
```

## 데이터베이스 설정

### 1. Prisma 스키마

```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
  output   = "../../../packages/prisma/src/generated/client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  USER
  ADMIN
}

model UserInfo {
  userId    String   @id @default(uuid()) @map("user_id")
  emlAddr   String   @unique @map("eml_addr")
  userNm    String   @unique @map("user_nm")
  userRole  UserRole @default(USER) @map("user_role")
  proflImg  String?  @map("profl_img")
  userBiogp String?  @map("user_biogp")

  // 상태 관리
  actvtnYn  Boolean   @default(true) @map("actvtn_yn")
  lastLgnDt DateTime? @map("last_lgn_dt")

  // 메타데이터
  crtDt  DateTime  @default(now()) @map("crt_dt")
  updtDt DateTime  @updatedAt @map("updt_dt")
  delDt  DateTime? @map("del_dt")

  // 관계
  UserCertInfo UserCertInfo?

  @@index([emlAddr])
  @@index([userNm])
  @@map("user_info")
}
```

### 2. Prisma 서비스

```typescript
// prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

## 에러 처리

### 1. 글로벌 예외 필터

```typescript
// http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorPayload } from '@repo/dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as { message?: string | string[] }).message ||
          'Internal server error';

    const errorPayload: ErrorPayload = {
      status,
      message: Array.isArray(message) ? message.join(', ') : message,
    };

    response.status(status).json(errorPayload);
  }
}
```

### 2. 성공 응답 인터셉터

```typescript
// success.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';
import { SuccessPayload } from '@repo/dto';

@Injectable()
export class SuccessInterceptor<T>
  implements NestInterceptor<T, SuccessPayload<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessPayload<T>> {
    const response = context.switchToHttp().getResponse<Response>();
    const status = response.statusCode;

    return next.handle().pipe(
      map((data: T) => ({
        status,
        data,
      })),
    );
  }
}
```

## 보안 설정

### 1. Rate Limiting

```typescript
// app.module.ts
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1분
        limit: 60, // 60회
      },
    ]),
  ],
})
export class AppModule {}
```

### 2. CORS 설정

```typescript
// main.ts
app.enableCors({
  origin: true,
  credentials: true,
});
```

### 3. 쿠키 보안

```typescript
// 쿠키 설정 예시
res.cookie('accessToken', accessToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 1000, // 1시간
});
```

## 모니터링 및 로깅

### 1. 로깅 설정

```typescript
// main.ts
import { Logger } from '@nestjs/common';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // ... 기타 설정

  await app.listen(port);
  logger.log(`애플리케이션이 ${port} 포트에서 실행 중입니다.`);
}
```

### 2. 요청 로깅 인터셉터

```typescript
// logging.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        this.logger.log(`${method} ${url} - ${responseTime}ms`);
      }),
    );
  }
}
```

## 배포 가이드

### 1. 프로덕션 빌드

```bash
# 의존성 설치
pnpm install --production

# TypeScript 컴파일
pnpm build

# 프로덕션 실행
pnpm start:prod
```

### 2. Docker 배포

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

EXPOSE 3001

CMD ["node", "dist/main"]
```

### 3. 환경 변수 관리

프로덕션 환경에서는 다음 환경 변수들을 설정해야 합니다:

- `DATABASE_URL`: 프로덕션 데이터베이스 URL (Prisma에서만 사용)

그 외의 설정들은 `packages/config/server.config.ts` 파일에서 관리됩니다:

- JWT 시크릿 키 및 만료 시간
- Nodemailer 설정
- 서버 포트 및 호스트
- Swagger 설정

프로덕션 환경에서는 `server.config.ts` 파일의 값을 실제 환경에 맞게 수정하여 사용합니다.

## 요약

이 가이드는 NestJS API 프로젝트의 전체적인 구조와 설정 방법을 다루고 있습니다. 주요 포인트는 다음과 같습니다:

- **모듈화된 구조**: 각 기능별로 모듈을 분리하여 관리
- **중앙화된 설정 관리**: `@repo/config` 패키지를 통한 설정 통합 관리
- **타입 안전성**: TypeScript와 Zod를 활용한 강력한 타입 검증
- **보안**: JWT 인증, Rate Limiting, CORS 설정
- **문서화**: Swagger를 통한 자동 API 문서 생성
- **에러 처리**: 글로벌 예외 필터와 인터셉터를 통한 일관된 응답 형식
- **데이터베이스**: Prisma ORM을 통한 타입 안전한 데이터베이스 접근

이 구조를 따라 개발하면 확장 가능하고 유지보수가 용이한 API 서버를 구축할 수 있습니다.
