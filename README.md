# Your Project Name - Turborepo

Next.js와 NestJS를 통합 관리하는 터보레포 프로젝트입니다.

## 프로젝트 구조

이 터보레포는 다음 앱과 패키지들을 포함합니다:

### Apps

- **`web`**: [Next.js](https://nextjs.org/) 프론트엔드 애플리케이션
  - React 19, TypeScript, TailwindCSS
  - shadcn/ui 컴포넌트 라이브러리
  - React Query, React Hook Form, Zod
  - 다크모드 지원, 반응형 디자인

- **`api`**: [NestJS](https://nestjs.com/) 백엔드 API 서버
  - TypeScript, Prisma ORM, PostgreSQL
  - JWT 인증 (쿠키 기반 토큰 관리)
  - 사용자 관리 (회원가입, 로그인, 프로필)
  - 이메일 서비스 (비밀번호 재설정)
  - API 요청 제한 (Throttling)
  - Swagger API 문서화
  - 보안 미들웨어 (CORS, Helmet)

### Packages

- **`@repo/config`**: 중앙화된 설정 관리
  - 웹 앱 설정 (사이트 정보, 메타데이터)
  - 서버 앱 설정 (포트, 호스트, 환경변수)
  - 환경별 설정 분기 처리

- **`@repo/dto`**: 데이터 전송 객체 및 폼 모델
  - Zod 기반 스키마 검증
  - 프론트엔드용 폼 모델
  - 백엔드용 DTO 클래스
  - NestJS와 React Hook Form 통합

- **`@repo/prisma`**: Prisma 클라이언트 및 데이터베이스 타입
  - PostgreSQL 데이터베이스 타입
  - Prisma 클라이언트 인스턴스
  - 스키마는 API 프로젝트에서 관리

## 시작하기

### 필수 요구사항

- Node.js 18+
- pnpm 8+
- PostgreSQL 데이터베이스

### 설치

```bash
# 의존성 설치
pnpm install

# 환경변수 설정 (API 프로젝트만)
cp apps/api/.env.example apps/api/.env
```

### 환경변수 설정

**API 프로젝트** (`apps/api/.env`):

```env
# 데이터베이스 (필수)
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
```

**웹 프로젝트**:

웹 프로젝트는 환경변수를 사용하지 않으며, 모든 설정은 `@repo/config` 패키지를 통해 관리됩니다.

**설정 관리 방식**:

- **API 프로젝트**: 데이터베이스 연결을 위한 `DATABASE_URL`만 환경변수 사용
- **웹 프로젝트**: 환경변수 사용하지 않음, `@repo/config` 패키지 사용
- **공통 설정**: `@repo/config` 패키지에서 중앙화된 설정 관리

### 데이터베이스 설정

```bash
# API 프로젝트로 이동
cd apps/api

# Prisma 클라이언트 생성
pnpm prisma generate

# 마이그레이션 실행
pnpm prisma migrate dev

# (선택) 시드 데이터 추가
pnpm prisma db seed
```

### 개발 서버 실행

```bash
# 전체 프로젝트 개발 서버 실행
pnpm dev

# 특정 앱만 실행
pnpm dev --filter=web
pnpm dev --filter=api
```

## 개발 도구

### TypeScript

모든 앱과 패키지는 100% [TypeScript](https://www.typescriptlang.org/)로 작성되었습니다.

### ESLint

통합된 ESLint 설정을 사용합니다:

```bash
# 전체 프로젝트 린팅
pnpm lint

# 전체 프로젝트 린팅 및 자동 수정
pnpm lint:fix

# 특정 앱만 린팅
pnpm lint --filter=web
pnpm lint --filter=api
```

### Build

```bash
# 전체 프로젝트 빌드
pnpm build

# 특정 앱만 빌드
pnpm build --filter=web
pnpm build --filter=api
```

## 프로젝트 커스터마이징

### 1. 프로젝트명 변경

**루트 레벨**:

```json
// package.json
{
  "name": "your-project-name"
}
```

**웹 앱**:

```typescript
// packages/config/web.config.ts
export const webConfig = {
  title: 'Your Project Title',
  description: 'Your project description',
  // ... 기타 설정
};
```

### 2. 데이터베이스 스키마 수정

```bash
cd apps/api
# schema.prisma 파일 수정
pnpm prisma generate
pnpm prisma migrate dev --name your_migration_name
```

### 3. 새로운 DTO 추가

```bash
# packages/dto/src/form-model/에 새로운 스키마 추가
# packages/dto/src/data-transfer-object/에 새로운 DTO 추가
```

### 4. 새로운 설정 추가

```bash
# packages/config/에 새로운 설정 파일 추가
# web.config.ts 또는 server.config.ts 수정
```

## 배포

### 웹 앱 배포 (Vercel)

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
cd apps/web
vercel
```

### API 서버 배포

```bash
# 프로덕션 빌드
cd apps/api
pnpm build

# 서버 실행
pnpm start:prod
```

## 유용한 명령어

### Turborepo 명령어

```bash
# 전체 프로젝트 작업
pnpm dev          # 개발 서버
pnpm build        # 빌드
pnpm lint         # 린팅
pnpm test         # 테스트

# 필터링
pnpm dev --filter=web     # 웹 앱만 개발
pnpm build --filter=api   # API만 빌드
```

### 데이터베이스 명령어

```bash
cd apps/api

# Prisma Studio (데이터베이스 GUI)
pnpm prisma studio

# 마이그레이션
pnpm prisma migrate dev

# 시드 데이터
pnpm prisma db seed
```

## Remote Caching

> [!TIP]
> Vercel Remote Cache는 모든 플랜에서 무료입니다. [vercel.com](https://vercel.com/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache)에서 시작하세요.

Turborepo는 [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)을 사용하여 팀과 CI/CD 파이프라인 간에 빌드 캐시를 공유할 수 있습니다.

```bash
# Vercel 계정으로 로그인
turbo login

# Remote Cache 연결
turbo link
```

## 유용한 링크

Turborepo의 강력한 기능에 대해 더 알아보세요:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)

## 요약

이 터보레포는 Next.js 프론트엔드와 NestJS 백엔드를 통합 관리하는 완전한 풀스택 개발 환경을 제공합니다. 중앙화된 설정, 타입 안전한 DTO, Prisma ORM을 통해 효율적이고 확장 가능한 개발이 가능합니다.
