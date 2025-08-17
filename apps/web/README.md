# Next.js 15 풀스택 템플릿

Next.js 15와 최신 기술 스택을 활용한 풀스택 웹 애플리케이션 템플릿입니다. 이 템플릿은 기본적인 설정이 완료된 상태로, 다양한 프로젝트의 기틀로 활용할 수 있습니다.

## 주요 기능

- **빠른 시작**: 기본적인 설정이 완료되어 있어, 바로 개발을 시작할 수 있습니다.
- **타입 안전성**: TypeScript와 Zod를 활용한 엔드-투-엔드 타입 안전성
- **모던 UI**: shadcn/ui 컴포넌트 라이브러리와 TailwindCSS
- **상태 관리**: React Query와 Zustand를 활용한 효율적인 상태 관리
- **폼 관리**: React Hook Form과 Zod를 활용한 강력한 폼 처리
- **다크모드**: 시스템 테마 감지 및 수동 전환 지원
- **반응형 디자인**: 모든 디바이스에서 최적화된 사용자 경험

## 기술 스택

### 프론트엔드

- **프레임워크**: Next.js 15 (App Router)
- **언어**: TypeScript
- **UI 라이브러리**: React 19
- **스타일링**: TailwindCSS v4, class-variance-authority
- **컴포넌트**: shadcn/ui, Radix UI
- **아이콘**: Lucide React, React Icons

### 상태 관리

- **서버 상태**: TanStack React Query v5
- **클라이언트 상태**: Zustand v5
- **폼 상태**: React Hook Form v7

### 데이터 검증 및 통신

- **스키마 검증**: Zod v4
- **HTTP 클라이언트**: Axios
- **인증**: JWT (쿠키 기반)

### 개발 도구

- **패키지 관리**: pnpm
- **린팅**: ESLint
- **타입 체크**: TypeScript
- **빌드 도구**: Turbopack

## 프로젝트 구조

```
apps/web/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 인증 관련 페이지
│   ├── (common)/          # 공통 레이아웃
│   ├── _components/       # 공통 컴포넌트
│   ├── _entities/         # 도메인별 엔티티
│   ├── _libs/             # 유틸리티 라이브러리
│   └── api/               # API 라우트
├── public/                # 정적 파일
├── components.json        # shadcn/ui 설정
├── tailwind.config.ts     # TailwindCSS 설정
└── next.config.ts         # Next.js 설정
```

## 설치 및 실행

### 필수 요구사항

- Node.js 18+
- pnpm 8+

### 설치

```bash
# 의존성 설치
pnpm install
```

### 설정 관리

이 프로젝트는 환경변수를 사용하지 않으며, 모든 설정은 `@repo/config` 패키지를 통해 중앙화되어 관리됩니다.

**설정 파일 위치**: `packages/config/web.config.ts`

**주요 설정 항목**:

- 사이트 제목, 설명, 키워드
- API URL, 도메인 설정
- 메타데이터, OpenGraph 설정
- 환경별 설정 분기 처리

### 개발 서버 실행

```bash
# 개발 서버 실행
pnpm dev

# 또는 터보레포를 통한 실행
pnpm dev --filter=web
```

브라우저에서 `http://localhost:3000`을 열어 결과를 확인하세요.

## 주요 기능 설명

### 인증 시스템

- JWT 기반 인증 (쿠키 저장)
- 회원가입/로그인 폼
- 비밀번호 재설정
- 보호된 라우트

### 컴포넌트 시스템

- shadcn/ui 기반 컴포넌트
- 재사용 가능한 UI 컴포넌트
- 다크모드 지원
- 접근성 고려

### 상태 관리

- React Query: 서버 상태 관리
- Zustand: 클라이언트 상태 관리
- React Hook Form: 폼 상태 관리

### API 통신

- Axios 기반 HTTP 클라이언트
- 타입 안전한 API 호출
- 에러 처리 및 로딩 상태 관리

## 개발 가이드

### 새로운 페이지 추가

```typescript
// app/your-page/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '페이지 제목',
  description: '페이지 설명',
};

export default function YourPage() {
  return (
    <div>
      <h1>새로운 페이지</h1>
    </div>
  );
}
```

### 새로운 컴포넌트 추가

```typescript
// app/_components/YourComponent.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/libs/utils';

const yourComponentVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        default: 'default-classes',
        secondary: 'secondary-classes',
      },
      size: {
        default: 'default-size',
        sm: 'small-size',
        lg: 'large-size',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface YourComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof yourComponentVariants> {}

export function YourComponent({
  className,
  variant,
  size,
  ...props
}: YourComponentProps) {
  return (
    <div
      className={cn(yourComponentVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

### API 호출 추가

```typescript
// app/_entities/users/users.api.ts
import { Api } from '@/tools/axios.tools';
import type { User } from '@repo/prisma';

export async function getUsers() {
  return Api.getQuery<User[]>('/users');
}

export async function getUserById(id: string) {
  return Api.getQuery<User>(`/users/${id}`);
}
```

## 빌드 및 배포

### 빌드

```bash
# 프로덕션 빌드
pnpm build

# 또는 터보레포를 통한 빌드
pnpm build --filter=web
```

### 배포

#### Vercel (권장)

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

#### 기타 플랫폼

```bash
# 정적 내보내기
pnpm build
pnpm start
```

## 요약

이 템플릿은 Next.js 15와 최신 기술 스택을 활용하여 현대적이고 확장 가능한 웹 애플리케이션을 빠르게 구축할 수 있도록 설계되었습니다. 타입 안전성, 모던 UI, 효율적인 상태 관리를 통해 개발자 경험과 사용자 경험을 모두 향상시킵니다.
