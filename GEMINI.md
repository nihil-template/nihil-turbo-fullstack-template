# nihilncunia.dev 프로젝트 개요

이 문서는 `nihilncunia.dev` 모노레포 프로젝트의 개요와 상세 분석을 제공합니다. 이 프로젝트는 **웹 서비스의 뼈대가 되는 템플릿**으로, 새로운 프로젝트를 시작할 때 기반으로 사용할 수 있도록 설계되었습니다. **pnpm**과 **Turborepo**를 사용하여 효율적으로 관리되며, **Next.js** 프론트엔드와 **NestJS** 백엔드로 구성된 풀스택 웹 애플리케이션의 구조를 갖추고 있습니다.

이 문서를 통해 개발자(또는 AI 에이전트)는 프로젝트의 전체 구조, 핵심 기술, 그리고 주요 기능 구현 방식을 파악하여 원하는 대로 손쉽게 커스터마이징하고 확장할 수 있습니다.

## 핵심 기술 스택

- **Frontend**: [Next.js](https://nextjs.org/) (React)
- **Backend**: [NestJS](https://nestjs.com/) (Node.js)
- **Database**: PostgreSQL with [Prisma](https://www.prisma.io/)
- **Monorepo**: [pnpm](https://pnpm.io/) workspaces & [Turborepo](https://turbo.build/)
- **API & Form Validation**: [Zod](https://zod.dev/)
- **API Communication**: [TanStack Query (React Query)](https://tanstack.com/query/latest) & [axios](https://axios-http.com/)
- **Client State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)

## 프로젝트 구조

모노레포는 `apps`와 `packages` 두 개의 주요 디렉터리로 구성됩니다.

- `apps/web`: Next.js 기반의 프론트엔드 애플리케이션입니다. 사용자 인터페이스와 관련된 모든 코드가 여기에 위치합니다.
- `apps/api`: NestJS 기반의 백엔드 API 서버입니다. 비즈니스 로직과 데이터베이스 처리를 담당합니다.
- `packages/config`: 웹과 API 서버에서 공유하는 환경 설정 (`web.config.ts`, `server.config.ts`)을 관리합니다.
- `packages/dto`: 프론트엔드와 백엔드 간의 데이터 전송을 위한 공유 데이터 전송 객체(DTO)와 Zod를 사용한 유효성 검사 스키마를 정의합니다.
- `packages/prisma`: Prisma 스키마(`schema.prisma`), 생성된 Prisma Client 및 관련 타입들을 포함합니다.
- `packages/shadcn`: `shadcn/ui`를 통해 생성된 재사용 가능한 UI 컴포넌트들을 관리합니다.

---

## 프로젝트 상세 분석

### Backend (`apps/api`)

NestJS를 기반으로 구축된 API 서버로, Prisma를 통해 데이터베이스와 상호작용하며 Zod를 사용하여 요청 데이터의 유효성을 검사합니다.

#### 인증 (Authentication)

- **인증 방식**: JWT (JSON Web Token)와 HTTP-Only 쿠키를 사용한 세션 기반 인증을 구현합니다.
- **토큰 종류**:
  - `AccessToken`: 1시간의 유효기간을 가지며, API 요청 시 사용자의 신원을 확인하는 데 사용됩니다.
  - `RefreshToken`: 30일의 유효기간을 가지며, AccessToken이 만료되었을 때 새로운 토큰 쌍을 재발급받는 데 사용됩니다. (Refresh Token Rotation 적용)
- **비밀번호 관리**: `bcrypt`를 사용하여 비밀번호를 안전하게 해싱하여 데이터베이스에 저장합니다.
- **비밀번호 재설정**: `nodemailer`를 사용하여 사용자의 이메일로 비밀번호 재설정 링크를 발송하는 기능을 제공합니다.

#### 주요 엔드포인트

##### 1. 인증 (`/auth`)

- `POST /signup`: 회원가입을 처리합니다. (`SignUpDto`)
- `POST /signin`: 로그인을 처리하고, `accessToken`과 `refreshToken`을 HTTP-Only 쿠키에 설정합니다. (`SignInDto`)
- `POST /refresh`: Refresh Token을 사용하여 새로운 토큰 쌍을 재발급합니다.
- `POST /signout`: 로그아웃을 처리하고, 서버에 저장된 Refresh Token을 무효화하며 쿠키를 삭제합니다. (AccessToken 필요)
- `GET /session`: 현재 로그인된 사용자의 세션 정보(사용자 정보)를 반환합니다. (AccessToken 필요)
- `DELETE /withdraw`: 회원 탈퇴를 처리합니다. (AccessToken 필요)
- `POST /change-password`: 현재 로그인된 사용자의 비밀번호를 변경합니다. (`ChangePasswordDto`, AccessToken 필요)
- `POST /forgot-password`: 비밀번호 재설정 링크를 이메일로 발송합니다. (`ForgotPasswordDto`)
- `POST /new-password`: 이메일 링크의 토큰을 검증하여 새 비밀번호를 설정합니다. (`NewPasswordDto`)

##### 2. 사용자 (`/users`)

- `GET /`: 전체 사용자 목록을 조회합니다.
- `GET /:userId`: 특정 사용자 정보를 ID로 조회합니다.
- `GET /email/:emlAddr`: 특정 사용자 정보를 이메일로 조회합니다.

### Frontend (`apps/web`)

Next.js(App Router) 기반의 프론트엔드 웹 애플리케이션입니다. **UI는 아직 개발 중**이지만, 핵심 로직과 데이터 흐름은 구현되어 있습니다.

#### 상태 관리 및 데이터 페칭

- **서버 상태 (Server State)**: `TanStack Query (React Query)`를 사용하여 API 데이터를 관리합니다. 비동기 데이터의 캐싱, 동기화, 업데이트를 효율적으로 처리하기 위해 모든 API 요청은 커스텀 훅을 통해 이루어집니다.
- **클라이언트 상태 (Client State)**: `Zustand`를 사용하여 UI 상태 등 클라이언트 측 전역 상태(예: 다크 모드)를 관리합니다.
- **API 요청**: `axios` 인스턴스를 사용하여 API 서버와 통신합니다. HTTP-Only 쿠키를 통해 자동으로 인증 정보가 전송됩니다.

#### 주요 커스텀 훅 (`app/_entities/**/*.hooks.ts`)

모든 API 요청은 `app/_entities/common/hooks/api`에 정의된 기본 훅 (`useGet`, `usePost` 등)을 기반으로 합니다. 각 엔티티(auth, users 등)별 훅은 이를 추상화하여 타입 안전성과 재사용성을 높입니다.

##### 1. 인증 (`app/_entities/auth/hooks`)

- `useSignUp()`: 회원가입 뮤테이션 훅
- `useSignIn()`: 로그인 뮤테이션 훅
- `useSignOut()`: 로그아웃 뮤테이션 훅
- `useGetSession()`: 현재 세션 정보(사용자 정보)를 가져오는 쿼리 훅
- `useWithdraw()`: 회원 탈퇴 뮤테이션 훅
- `useForgotPassword()`: 비밀번호 재설정 요청 뮤테이션 훅
- `useNewPassword()`: 새 비밀번호 설정 뮤테이션 훅
- `useChangePassword()`: 비밀번호 변경 뮤테이션 훅

##### 2. 사용자 (`app/_entities/users/hooks`)

- `useGetUsers()`: 사용자 목록을 조회하는 쿼리 훅
- `useGetUser(userId)`: 특정 사용자 정보를 ID로 조회하는 쿼리 훅
- `useGetProfile()`: 현재 로그인된 사용자의 프로필 정보를 가져오는 쿼리 훅
- `useUpdateProfile()`: 프로필 정보를 수정하는 뮤테이션 훅

---

## 빌드 및 실행

### 개발 환경 실행

프로젝트 루트에서 다음 명령어를 실행하여 프론트엔드와 백엔드를 동시에 개발 모드로 실행합니다.

```bash
pnpm dev
```

특정 애플리케이션만 실행할 경우 `--filter` 플래그를 사용합니다.

```bash
# web 앱만 실행
pnpm dev --filter=web

# api 서버만 실행
pnpm dev --filter=api
```

### 빌드

프로젝트 전체를 빌드합니다.

```bash
pnpm build
```

### 코드 스타일 검사 (Linting)

프로젝트 전체의 코드 스타일을 검사하고 수정합니다.

```bash
# 검사
pnpm lint

# 자동 수정
pnpm lint:fix
```

### 데이터베이스 (Database)

Prisma 관련 모든 명령어는 `api` 프로젝트에서 실행해야 합니다. (`pnpm --filter=api db:*` 또는 `apps/api` 디렉터리에서 `pnpm db:*`)

- `pnpm db:generate --filter=api`: Prisma 스키마 변경 후 Prisma Client를 다시 생성합니다.
- `pnpm db:migrate --filter=api`: 데이터베이스 마이그레이션을 적용합니다.
- `pnpm db:studio --filter=api`: Prisma Studio를 실행하여 GUI로 데이터베이스를 확인합니다.

---

## 개발자를 위한 안내

- **코드 스타일**: 이 프로젝트는 Prettier와 ESLint를 사용하여 코드 스타일을 통일합니다. 커밋 전에 `pnpm lint:fix`를 실행하는 것을 권장합니다.
- **사전 확인**: 작업을 시작하기 전에는 항상 작업할 패키지 또는 앱의 `package.json`과 `tsconfig.json`을 확인하여 현재 설정을 준수하는 코드를 작성해야 합니다.
- **UI 컴포넌트 추가**: `packages/shadcn`에서 `pnpm generate:component` 명령어를 사용하여 새로운 UI 컴포넌트를 추가할 수 있습니다.
- **Tailwind CSS v4 설정**: 이 프로젝트는 Tailwind CSS v4를 사용합니다. v4부터는 `tailwind.config.ts` 파일에 `content`나 `theme`을 직접 설정하지 않습니다. 대신, 메인 CSS 파일 (`packages/shadcn/src/styles/tailwind.css` 등)에 `@import` 규칙을 사용하여 스타일을 가져오고, `@theme` 규칙을 통해 테마를 확장합니다. Tailwind는 PostCSS 설정을 통해 자동으로 `@import`된 파일들을 감지하고 처리합니다. 따라서 `apps/web`에서 `packages/shadcn`의 컴포넌트를 사용하기 위해 별도의 `tailwind.config.ts` 파일을 생성할 필요가 없습니다.

---

## 참고하면 좋은 파일

- `apps/api/prisma/schema.prisma`: 데이터베이스 스키마 정의 파일. 모델 구조를 파악하는 데 핵심적입니다.
- `packages/dto/src/**/*.ts`: API 요청/응답 데이터 구조와 유효성 검사 규칙이 정의되어 있습니다.
- `packages/config/*.config.ts`: 웹과 서버의 환경별 설정 파일입니다.
- `apps/web/app/_entities/common/hooks/api/*.ts`: 모든 API 요청의 기반이 되는 `useGet`, `usePost` 등 기본 훅의 구현을 확인할 수 있습니다.
- `apps/api/src/auth/auth.controller.ts`: 인증 관련 모든 API 엔드포인트가 정의되어 있습니다.
- `apps/web/app/_entities/auth/hooks/*.ts`: 인증 관련 모든 프론트엔드 로직(React Query 훅)이 구현되어 있습니다.
- `apps/api/src/main.ts`: 백엔드 서버의 글로벌 미들웨어, 파이프, 인터셉터 등 설정의 진입점입니다.
