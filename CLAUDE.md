# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**IMPORTANT: All responses and communication must be in Korean (한국어) when working with this codebase.**

## 프로젝트 개요

이 프로젝트는 **웹 서비스의 뼈대가 되는 템플릿**으로, 새로운 프로젝트를 시작할 때 기반으로 사용할 수 있도록 설계된 Turborepo 모노레포입니다. **pnpm**과 **Turborepo**를 사용하여 효율적으로 관리되며, **Next.js** 프론트엔드와 **NestJS** 백엔드로 구성된 풀스택 웹 애플리케이션의 구조를 갖추고 있습니다.

## 핵심 기술 스택

- **Frontend**: [Next.js](https://nextjs.org/) (React 19) with TypeScript, TailwindCSS v4
- **Backend**: [NestJS](https://nestjs.com/) (Node.js) with TypeScript
- **Database**: PostgreSQL with [Prisma](https://www.prisma.io/) ORM
- **Monorepo**: [pnpm](https://pnpm.io/) workspaces & [Turborepo](https://turbo.build/)
- **API & Form Validation**: [Zod](https://zod.dev/)
- **API Communication**: [TanStack Query (React Query)](https://tanstack.com/query/latest) & [axios](https://axios-http.com/)
- **Client State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Authentication**: JWT (JSON Web Token)와 HTTP-Only 쿠키 기반 인증

## 필수 명령어

### 개발 환경 실행
```bash
# 전체 서비스 실행
pnpm dev

# 특정 앱만 실행
pnpm web:dev    # 프론트엔드만
pnpm api:dev    # 백엔드만

# 필터 사용
pnpm dev --filter=web
pnpm dev --filter=api
```

### 빌드
```bash
# 전체 프로젝트 빌드
pnpm build

# 특정 앱 빌드
pnpm web:build
pnpm api:build

# 패키지 먼저 빌드
pnpm packages:build
```

### 린팅 및 타입 체크
```bash
# 전체 린팅
pnpm lint

# 린팅 자동 수정
pnpm lint:fix

# 타입 체크
pnpm check-types
```

### 데이터베이스 (API 앱만)
```bash
# Prisma 클라이언트 생성
pnpm db:generate --filter=api

# 마이그레이션 실행
pnpm db:migrate --filter=api

# Prisma Studio 실행
pnpm db:studio --filter=api

# 스키마 변경 푸시
pnpm db:push --filter=api

# 데이터베이스 시드
pnpm db:seed --filter=api
```

### 패키지 관리
```bash
# 웹 앱에 의존성 추가
pnpm web:add <package>

# API 앱에 의존성 추가
pnpm api:add <package>

# 전체 패키지 업데이트
pnpm all:update
```

## 프로젝트 구조

### Apps
- `apps/web/` - Next.js 기반 프론트엔드 애플리케이션
- `apps/api/` - NestJS 기반 백엔드 API 서버

### Packages (공유 패키지)
- `packages/config/` - 웹과 API 서버에서 공유하는 환경 설정
- `packages/dto/` - 프론트엔드와 백엔드 간 데이터 전송 객체 및 Zod 유효성 검사 스키마
- `packages/prisma/` - Prisma 클라이언트 및 데이터베이스 타입
- `packages/message/` - 국제화 및 에러 메시지

### Frontend Structure (`apps/web/app/`)
- `(auth)/` - Authentication pages (signin, signup, forgot password)
- `(common)/` - Common components, layouts, and utilities
- `(profile)/` - User profile pages
- `(users)/` - User management pages
- `_data/` - Static data and constants
- `_entities/` - Domain-specific hooks, types, API clients
- `_layouts/` - Layout components and providers
- `_libs/` - Utility libraries and tools

### Backend Structure (`apps/api/src/`)
- `auth/` - Authentication module (JWT strategy, guards)
- `users/` - User management module
- `prisma/` - Prisma service and module

## 개발 가이드라인

### 명명 규칙
- 파일: kebab-case (예: `user-profile.tsx`)
- React 컴포넌트: PascalCase (예: `UserProfile.tsx`)
- 폴더: kebab-case
- 데이터베이스 테이블: snake_case with `@@map`
- API 엔드포인트: RESTful 규칙
- 에러 메시지: 반드시 한국어로 작성

### 파일 구조
- 라우트 기반 폴더는 `_components/` 및 `_layouts/` 하위 디렉터리를 가짐
- 각 컴포넌트 폴더는 반드시 `index.ts` 파일을 포함하고 명시적으로 export
- `export { Component } from './Component'` 문법 사용 (`export *` 금지)
- 프로젝트에 필요한 작은 데이터는 `/app/_data` 폴더에 저장
- `/app/_entities` 폴더에는 프로젝트의 각 자원별로 hooks, types, api, store, keys 등 하위 폴더/파일을 명확히 분리

### 코드 표준
- 개발팀과의 모든 소통은 한국어로 진행
- TypeScript 엄격 모드 사용 및 적절한 타이핑
- 모든 데이터 전송에 Zod 검증 사용
- 에러 메시지는 반드시 한국어로 작성
- 모든 패키지 관리는 pnpm 사용
- 모든 구문은 한 줄씩 띄어서 작성 (구문과 구문 사이에 공백 필수)

### Frontend Patterns
- Server Components by default (no `use client` in page.tsx)
- Client Components only when necessary for interactivity
- React Query for API state management
- Zustand for client-side state
- shadcn/ui components in `app/(common)/_components/ui/`
- Custom components with class-variance-authority (cva)

### Backend Patterns
- NestJS modules with proper dependency injection
- Prisma for database operations
- JWT authentication with cookie storage
- Global exception filtering and success interceptors
- Swagger API documentation at `/api` endpoint
- Zod validation pipes for request validation

## Testing

The project structure suggests testing capabilities but specific test commands were not found in package.json files. Verify test setup before running tests.

## 환경 설정

### 필수 요구사항
- Node.js 18+
- pnpm 10.15.0+
- PostgreSQL 데이터베이스

### API 환경변수
API 앱만 환경변수가 필요합니다:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

### 설정 관리 방식
- 웹 앱: `@repo/config` 패키지 사용 (환경변수 사용 안 함)
- API 앱: DATABASE_URL만 환경변수, 나머지 설정은 `@repo/config` 사용
- 공통 설정: `packages/config/`에서 타입 안전한 설정 객체 관리

## 중요 참고사항

### 인증 시스템
- **인증 방식**: JWT와 HTTP-Only 쿠키를 사용한 세션 기반 인증
- **토큰 종류**:
  - `AccessToken`: 1시간 유효기간, API 요청 시 사용자 신원 확인
  - `RefreshToken`: 30일 유효기간, AccessToken 갱신용 (Refresh Token Rotation 적용)
- **비밀번호 관리**: bcrypt를 사용한 안전한 해싱
- **비밀번호 재설정**: nodemailer를 통한 이메일 발송 기능

### 개발 규칙
- 공유 패키지 변경 시 패키지를 먼저 빌드한 후 앱 빌드
- 데이터베이스 스키마는 `apps/api/prisma/schema.prisma`에서 관리
- 공유 타입과 DTO로 프론트엔드-백엔드 간 타입 안전성 보장
- 모든 데이터베이스 모델은 UUID 기본 키 사용 (자동 생성)
- Tailwind CSS v4 사용: `tailwind.config.ts`에 직접 설정하지 않고 CSS 파일의 `@import`와 `@theme` 규칙 사용

### 주요 API 엔드포인트
#### 인증 (`/auth`)
- `POST /signup`: 회원가입
- `POST /signin`: 로그인 (토큰을 HTTP-Only 쿠키에 설정)
- `POST /refresh`: 토큰 재발급
- `POST /signout`: 로그아웃
- `GET /session`: 현재 세션 정보
- `DELETE /withdraw`: 회원 탈퇴
- `POST /change-password`: 비밀번호 변경
- `POST /forgot-password`: 비밀번호 재설정 링크 발송
- `POST /new-password`: 새 비밀번호 설정

#### 사용자 (`/users`)
- `GET /`: 전체 사용자 목록
- `GET /:userId`: 특정 사용자 정보 (ID로 조회)
- `GET /email/:emlAddr`: 특정 사용자 정보 (이메일로 조회)

### 참고하면 좋은 핵심 파일
- `apps/api/prisma/schema.prisma`: 데이터베이스 스키마 정의
- `packages/dto/src/**/*.ts`: API 요청/응답 구조 및 유효성 검사 규칙
- `packages/config/*.config.ts`: 웹과 서버의 환경별 설정
- `apps/web/app/_entities/common/hooks/api/*.ts`: 모든 API 요청의 기반이 되는 기본 훅
- `apps/api/src/auth/auth.controller.ts`: 인증 관련 모든 API 엔드포인트
- `apps/web/app/_entities/auth/hooks/*.ts`: 인증 관련 프론트엔드 로직
- `apps/api/src/main.ts`: 백엔드 서버의 글로벌 설정 진입점