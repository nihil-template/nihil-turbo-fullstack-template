# @repo/prisma 패키지 가이드

## 목차

1. [패키지 개요](#패키지-개요)
2. [패키지 구조](#패키지-구조)
3. [Prisma 클라이언트](#prisma-클라이언트)
4. [사용법](#사용법)
5. [모노레포 연동](#모노레포-연동)
6. [모범 사례](#모범-사례)

## 패키지 개요

`@repo/prisma`는 터보리포(Turborepo) 기반 모노레포에서 사용하는 Prisma 클라이언트 패키지입니다. 데이터베이스 스키마와 생성된 Prisma 클라이언트를 중앙화하여 관리하여 모든 애플리케이션에서 일관된 데이터베이스 접근을 제공합니다.

### 주요 특징

- **중앙화된 데이터베이스 접근**: 모든 애플리케이션에서 동일한 Prisma 클라이언트 사용
- **타입 안전성**: TypeScript와 Prisma의 완벽한 통합
- **스키마 관리**: 단일 위치에서 데이터베이스 스키마 관리
- **자동 생성**: Prisma 클라이언트 자동 생성 및 업데이트
- **모노레포 최적화**: 터보리포 환경에 최적화된 구조

## 패키지 구조

```
packages/prisma/
├── package.json                    # 패키지 메타데이터
├── eslint.config.mjs              # ESLint 설정
├── dist/                          # 빌드된 파일들 (없음)
├── node_modules/                  # 의존성
└── src/
    └── generated/                 # Prisma 생성 파일들
        └── client/                # Prisma 클라이언트
            ├── index.js           # 메인 클라이언트 파일
            ├── index.d.ts         # TypeScript 타입 정의
            └── ...                # 기타 Prisma 생성 파일들
```

### 패키지 메타데이터

```json
{
  "name": "@repo/prisma",
  "version": "0.0.0",
  "private": true,
  "main": "./src/generated/client/index.js",
  "types": "./src/generated/client/index.d.ts",
  "scripts": {
    "lint": "eslint . --config ./eslint.config.mjs",
    "lint:fix": "eslint . --config ./eslint.config.mjs --fix"
  }
}
```

## Prisma 클라이언트

이 패키지는 Prisma 스키마에서 자동 생성된 클라이언트를 제공합니다. 스키마는 `apps/api/prisma/schema.prisma`에서 관리되며, 생성된 클라이언트는 이 패키지를 통해 모든 애플리케이션에서 사용할 수 있습니다.

### 생성된 타입들

```typescript
// Prisma에서 자동 생성된 타입들
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface UserInfo {
  userId: string;
  emlAddr: string;
  userNm: string;
  userRole: UserRole;
  proflImg?: string;
  userBiogp?: string;
  actvtnYn: boolean;
  lastLgnDt?: Date;
  crtDt: Date;
  updtDt: Date;
  delDt?: Date;
  UserCertInfo?: UserCertInfo;
}

export interface UserCertInfo {
  userCertId: string;
  userId: string;
  encptPswd: string;
  reshToken?: string;
  delYn: boolean;
  crtDt: Date;
  updtDt: Date;
  delDt?: Date;
  user: UserInfo;
}
```

## 사용법

### 1. 패키지 설치 및 설정

**의존성 추가**:

```json
{
  "dependencies": {
    "@repo/prisma": "workspace:*"
  }
}
```

**TypeScript 경로 설정**:

```json
{
  "compilerOptions": {
    "paths": {
      "@repo/prisma": ["../../packages/prisma/src/generated/client"]
    }
  }
}
```

### 2. NestJS에서 사용

```typescript
// prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@repo/prisma';

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

// users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { UserInfo, UserRole } from '@repo/prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<UserInfo[]> {
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

  async getUserById(userId: string): Promise<UserInfo | null> {
    return this.prisma.userInfo.findUnique({
      where: { userId },
      include: { UserCertInfo: true },
    });
  }

  async createUser(userData: {
    emlAddr: string;
    userNm: string;
    userRole: UserRole;
    encptPswd: string;
  }): Promise<UserInfo> {
    return this.prisma.userInfo.create({
      data: {
        emlAddr: userData.emlAddr,
        userNm: userData.userNm,
        userRole: userData.userRole,
        UserCertInfo: {
          create: {
            encptPswd: userData.encptPswd,
          },
        },
      },
      include: { UserCertInfo: true },
    });
  }
}
```

### 3. 프론트엔드에서 타입 사용

```typescript
// 프론트엔드에서 Prisma 타입 사용
import type { UserInfo, UserRole } from '@repo/prisma';

// 사용자 목록 컴포넌트
interface UserListProps {
  users: UserInfo[];
}

export function UserList({ users }: UserListProps) {
  return (
    <div>
      {users.map((user) => (
        <div key={user.userId}>
          <h3>{user.userNm}</h3>
          <p>{user.emlAddr}</p>
          <span>{user.userRole}</span>
        </div>
      ))}
    </div>
  );
}

// 사용자 역할 타입 사용
const userRoleOptions: { value: UserRole; label: string }[] = [
  { value: 'USER', label: '일반 사용자' },
  { value: 'ADMIN', label: '관리자' },
];
```

### 4. DTO에서 Prisma 타입 사용

```typescript
// @repo/dto 패키지에서 Prisma 타입 사용
import { UserRole } from '@repo/prisma';
import { z } from 'zod';

export const SignUpSchema = z.object({
  emlAddr: z.string().email(),
  userNm: z.string().min(2),
  userRole: z.enum([UserRole.USER, UserRole.ADMIN]),
  password: z.string().min(10),
  passwordConfirm: z.string(),
});

export type SignUpType = z.infer<typeof SignUpSchema>;
```

## 모노레포 연동

### 1. 스키마 위치

Prisma 스키마는 `apps/api/prisma/schema.prisma`에 위치하며, 클라이언트는 `packages/prisma/src/generated/client/`에 생성됩니다.

```prisma
// apps/api/prisma/schema.prisma
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
  actvtnYn  Boolean  @default(true) @map("actvtn_yn")
  lastLgnDt DateTime? @map("last_lgn_dt")
  crtDt     DateTime @default(now()) @map("crt_dt")
  updtDt    DateTime @updatedAt @map("updt_dt")
  delDt     DateTime? @map("del_dt")
  UserCertInfo UserCertInfo?

  @@index([emlAddr])
  @@index([userNm])
  @@map("user_info")
}
```

### 2. 빌드 프로세스

**터보리포 설정 (turbo.json)**:

```json
{
  "pipeline": {
    "db:generate": {
      "cache": false
    },
    "build": {
      "dependsOn": ["^build", "db:generate"],
      "outputs": ["dist/**"]
    }
  }
}
```

**API 패키지 스크립트 (apps/api/package.json)**:

```json
{
  "scripts": {
    "db:generate": "prisma generate --no-engine",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio"
  }
}
```

### 3. 의존성 관리

**API 애플리케이션 (apps/api/package.json)**:

```json
{
  "dependencies": {
    "@repo/prisma": "workspace:*",
    "@prisma/client": "^6.14.0"
  },
  "devDependencies": {
    "prisma": "^6.14.0"
  }
}
```

**웹 애플리케이션 (apps/web/package.json)**:

```json
{
  "dependencies": {
    "@repo/prisma": "workspace:*"
  }
}
```

## 모범 사례

### 1. 서비스 레이어에서 사용

```typescript
// users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { UserInfo, UserRole } from '@repo/prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(emlAddr: string): Promise<UserInfo | null> {
    return this.prisma.userInfo.findUnique({
      where: { emlAddr },
      include: { UserCertInfo: true },
    });
  }

  async createUser(data: {
    emlAddr: string;
    userNm: string;
    userRole: UserRole;
    encptPswd: string;
  }): Promise<UserInfo> {
    // 중복 이메일 체크
    const existingUser = await this.findUserByEmail(data.emlAddr);
    if (existingUser) {
      throw new Error('이미 존재하는 이메일입니다.');
    }

    return this.prisma.userInfo.create({
      data: {
        emlAddr: data.emlAddr,
        userNm: data.userNm,
        userRole: data.userRole,
        UserCertInfo: {
          create: {
            encptPswd: data.encptPswd,
          },
        },
      },
      include: { UserCertInfo: true },
    });
  }

  async updateUser(userId: string, data: Partial<UserInfo>): Promise<UserInfo> {
    const user = await this.prisma.userInfo.findUnique({
      where: { userId },
    });

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    return this.prisma.userInfo.update({
      where: { userId },
      data,
      include: { UserCertInfo: true },
    });
  }

  async deleteUser(userId: string): Promise<void> {
    await this.prisma.userInfo.update({
      where: { userId },
      data: {
        delDt: new Date(),
        actvtnYn: false,
      },
    });
  }
}
```

### 2. 트랜잭션 사용

```typescript
// 복잡한 트랜잭션 처리
async function transferUserData(fromUserId: string, toUserId: string) {
  return this.prisma.$transaction(async (tx) => {
    // 사용자 데이터 조회
    const fromUser = await tx.userInfo.findUnique({
      where: { userId: fromUserId },
      include: { UserCertInfo: true },
    });

    if (!fromUser) {
      throw new Error('원본 사용자를 찾을 수 없습니다.');
    }

    // 대상 사용자 업데이트
    const updatedUser = await tx.userInfo.update({
      where: { userId: toUserId },
      data: {
        userNm: fromUser.userNm,
        userBiogp: fromUser.userBiogp,
        proflImg: fromUser.proflImg,
      },
    });

    // 원본 사용자 비활성화
    await tx.userInfo.update({
      where: { userId: fromUserId },
      data: {
        actvtnYn: false,
        delDt: new Date(),
      },
    });

    return updatedUser;
  });
}
```

### 3. 타입 안전성 확보

```typescript
// 엄격한 타입 정의
import type { UserInfo, UserRole } from '@repo/prisma';

// 사용자 생성 데이터 타입
interface CreateUserData {
  emlAddr: string;
  userNm: string;
  userRole: UserRole;
  encptPswd: string;
}

// 사용자 업데이트 데이터 타입
type UpdateUserData = Partial<Pick<UserInfo, 'userNm' | 'userBiogp' | 'proflImg'>>;

// 서비스 메서드
async createUser(data: CreateUserData): Promise<UserInfo> {
  return this.prisma.userInfo.create({
    data: {
      emlAddr: data.emlAddr,
      userNm: data.userNm,
      userRole: data.userRole,
      UserCertInfo: {
        create: {
          encptPswd: data.encptPswd,
        },
      },
    },
    include: { UserCertInfo: true },
  });
}

async updateUser(userId: string, data: UpdateUserData): Promise<UserInfo> {
  return this.prisma.userInfo.update({
    where: { userId },
    data,
    include: { UserCertInfo: true },
  });
}
```

### 4. 에러 처리

```typescript
// Prisma 에러 처리
import { Prisma } from '@repo/prisma';

async function createUser(data: CreateUserData): Promise<UserInfo> {
  try {
    return await this.prisma.userInfo.create({
      data: {
        emlAddr: data.emlAddr,
        userNm: data.userNm,
        userRole: data.userRole,
        UserCertInfo: {
          create: {
            encptPswd: data.encptPswd,
          },
        },
      },
      include: { UserCertInfo: true },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('이미 존재하는 이메일 또는 사용자명입니다.');
      }
      if (error.code === 'P2025') {
        throw new Error('사용자를 찾을 수 없습니다.');
      }
    }
    throw error;
  }
}
```

## 요약

`@repo/prisma` 패키지는 모노레포 환경에서 데이터베이스 접근을 중앙화하여 관리하는 핵심 도구입니다. 주요 장점은 다음과 같습니다:

- **중앙화된 데이터베이스 접근**: 모든 애플리케이션에서 동일한 Prisma 클라이언트 사용
- **타입 안전성**: TypeScript와 Prisma의 완벽한 통합으로 타입 안전성 보장
- **일관성**: 프론트엔드와 백엔드에서 동일한 데이터 타입 사용
- **자동화**: 스키마 변경 시 자동으로 클라이언트 업데이트
- **모노레포 최적화**: 터보리포 환경에 최적화된 구조

이 패키지를 활용하면 데이터베이스 관련 작업이 훨씬 효율적이고 안전하게 이루어집니다.
