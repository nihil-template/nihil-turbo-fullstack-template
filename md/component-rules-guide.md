# Next.js 컴포넌트 작성 규칙 가이드

## 개요

이 문서는 Next.js 15 풀스택 템플릿 프로젝트의 컴포넌트 작성 규칙을 정의합니다. 모든 컴포넌트는 일관성과 유지보수성을 위해 엄격한 규칙을 따라야 합니다.

## 폴더 구조 규칙

### 라우트 그룹 구조

- `app/(common)/` - 공통 컴포넌트 및 레이아웃
- `app/(auth)/` - 인증 관련 컴포넌트
- `app/(profile)/` - 프로필 관련 컴포넌트

### 컴포넌트 폴더 구조

```
app/
├── (common)/
│   ├── _components/
│   │   ├── form/           # 폼 관련 컴포넌트
│   │   ├── ui/             # shadcn/ui 컴포넌트 (제외)
│   │   └── index.ts        # 명시적 export
│   └── _layouts/
├── (auth)/
│   ├── _components/
│   └── auth/
│       ├── signin/
│       │   ├── _components/
│       │   └── page.tsx
│       └── signup/
└── _entities/              # 도메인별 엔티티
    ├── auth/
    │   ├── hooks/          # React Query 훅
    │   ├── auth.types.ts
    │   ├── auth.store.ts
    │   └── auth.keys.ts
    └── common/
```

## 1. CVA (Class Variance Authority) 구조 규칙

### 모든 컴포넌트는 CVA 구조를 따라야 함

**필수 구조:**

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [
    `기본 스타일 클래스들`,
  ],
  {
    variants: {
      // 변형 옵션들
    },
    defaultVariants: {
      // 기본값들
    },
    compoundVariants: [
      // 복합 변형들
    ],
  }
);

export function ComponentName({ className, ...props }: Props) {
  return (
    <element
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      {/* 컴포넌트 내용 */}
    </element>
  );
}
```

### CVA 분리 규칙

**복잡한 컴포넌트의 경우 CVA를 별도 파일로 분리:**

```typescript
// form-input.cva.ts
export const itemVariants = cva([...]);
export const fieldContainerVariants = cva([...]);
export const labelVariants = cva([...]);
export const inputVariants = cva([...]);

// FormInput.tsx
import { itemVariants, fieldContainerVariants, labelVariants, inputVariants } from './form-input.cva';
```

### CVA 변형 규칙

- **variants**: 컴포넌트의 주요 변형 (size, variant, layout 등)
- **defaultVariants**: 기본값 설정
- **compoundVariants**: 복합 조건 스타일링
- **className**: 사용자 정의 클래스 병합

## 2. React Query 커스텀 훅 사용 규칙

### 훅 호출 및 에러 처리

**컴포넌트에서 훅 사용 시 onSuccess, onError 처리:**

```typescript
// SignInForm.tsx 예시
export function SignInForm({ className, ...props }: Props) {
  const { mutate: signIn, isPending } = useSignIn({
    onSuccess: () => {
      toast.success(messageData.auth.signInSuccess, {
        style: getToastStyle('success'),
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || messageData.auth.signInError,
        {
          style: getToastStyle('error'),
        },
      );
    },
  });

  // 컴포넌트 로직...
}
```

### 훅 구조 규칙

**훅 파일 구조:**

```typescript
// useSignIn.ts
interface UseSignInOptions extends MutationOptionsType<UserInfo, SignInData> {}

export function useSignIn(options: UseSignInOptions = {}) {
  const query = usePost<UserInfo, SignInData>({
    url: ['auth', 'signin'],
    key: authKeys.signin(),
    options,
  });

  return {
    ...query,
    session: query.data,
  };
}
```

## 3. 파일 참조 및 데이터 구조 분석 규칙

### 컴포넌트 작성 전 필수 절차

1. **관련 파일 구조 분석**
   - 타입 정의 파일 확인 (`*.types.ts`)
   - API 함수 구조 확인 (`*.api.ts`)
   - 스토어 구조 확인 (`*.store.ts`)
   - 쿼리 키 구조 확인 (`*.keys.ts`)

2. **데이터 흐름 파악**
   - 백엔드 DTO 구조 확인
   - 프론트엔드 타입 매핑 확인
   - API 응답 구조 확인

3. **의존성 관계 확인**
   - import 경로 정확성 확인
   - 타입 호환성 확인
   - 함수 시그니처 확인

### 파일 참조 예시

```typescript
// 1. 타입 정의 확인
import type { SignInType } from '@repo/dto/formModel';
import type { UserInfo } from '@repo/prisma';

// 2. API 함수 확인
import { useSignIn } from '@/_entities/auth/hooks';

// 3. 스토어 확인
import { useAuthActions } from '@/_entities/auth/auth.store';

// 4. 유틸리티 확인
import { cn, getToastStyle } from '@/_libs';
```

## 4. Page.tsx 작성 규칙

### 페이지 컴포넌트 분리 원칙

**page.tsx는 최소한의 구조만 유지:**

```typescript
// page.tsx
import React from 'react';
import { setMeta } from '@/_libs';
import { SignUpForm } from './_components';

export const metadata = setMeta({
  title: '회원가입',
  url: '/auth/signup',
});

export default function SignUpPage() {
  return <SignUpForm />;
}
```

**실제 렌더링 컴포넌트는 별도 파일로 분리:**

```typescript
// SignUpForm.tsx
export function SignUpForm({ className, ...props }: Props) {
  // 모든 로직과 상태 관리
  // 폼 처리
  // API 호출
  // 에러 처리
  // UI 렌더링
}
```

### 페이지 구조 규칙

- **page.tsx**: 메타데이터, 라우팅, 최소한의 구조
- **별도 컴포넌트 파일**: 모든 비즈니스 로직과 UI 렌더링
- **\_components 폴더**: 페이지별 컴포넌트들
- **index.ts**: 명시적 export

## 5. 폼 스키마 관리 규칙

### ⚠️ 모든 폼 스키마는 @repo/dto에서 관리

**폼 스키마는 반드시 @repo/dto 패키지에서 정의하고 관리해야 합니다.**

```typescript
// ✅ 올바른 예시 - @repo/dto에서 스키마 import
import { SignUpSchema, SignUpType } from '@repo/dto/formModel';
import { zodResolver } from '@hookform/resolvers/zod';

export function SignUpForm({ className, ...props }: Props) {
  const form = useForm<SignUpType>({
    mode: 'all',
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      emlAddr: '',
      userNm: '',
      userRole: 'USER',
      password: '',
      passwordConfirm: '',
    },
  });

  // 컴포넌트 로직...
}
```

**❌ 잘못된 예시 - 컴포넌트 내에서 스키마 정의**

```typescript
// ❌ 컴포넌트 파일에서 직접 스키마 정의 금지
const SignUpSchema = z.object({
  emlAddr: z.string().email(),
  password: z.string().min(8),
});
```

### 폼 스키마 사용 규칙

1. **스키마 import**: `@repo/dto/formModel`에서 스키마와 타입 import
2. **타입 안전성**: Zod 스키마로부터 자동 생성된 타입 사용
3. **검증 일관성**: 프론트엔드와 백엔드에서 동일한 검증 규칙 적용
4. **재사용성**: 공통 스키마의 효율적인 재사용

### 폼 스키마 예시

```typescript
// @repo/dto/formModel/auth.form-model.ts
export const SignUpSchema = z
  .object({
    emlAddr: z.string().email('올바른 이메일 형식을 입력해주세요.'),
    userNm: z.string().min(2, '사용자명은 2자 이상이어야 합니다.'),
    userRole: z.enum(['USER', 'ADMIN']),
    password: z.string().min(10, '비밀번호는 10자 이상이어야 합니다.'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type SignUpType = z.infer<typeof SignUpSchema>;
```

## 6. 컴포넌트 작성 템플릿

### 기본 컴포넌트 템플릿

```typescript
'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [
    `기본 스타일 클래스들`,
  ],
  {
    variants: {
      // 변형 옵션들
    },
    defaultVariants: {
      // 기본값들
    },
    compoundVariants: [
      // 복합 변형들
    ],
  }
);

export function ComponentName({ className, ...props }: Props) {
  return (
    <element
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      {/* 컴포넌트 내용 */}
    </element>
  );
}
```

### 폼 컴포넌트 템플릿

```typescript
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormInput } from '@/(common)/_components/form/FormInput';
import { SubmitButton } from '@/(common)/_components/form/SubmitButton';
import { Form } from '@/(common)/_components/ui/form';
import { messageData } from '@/_data/message.data';
import { useCustomHook } from '@/_entities/entity/hooks';
import { cn, getToastStyle } from '@/_libs';

// ⚠️ 스키마는 반드시 @repo/dto에서 import
import { FormSchema, FormType } from '@repo/dto/formModel';

interface Props
  extends React.FormHTMLAttributes<HTMLFormElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [
    `flex flex-col gap-2 flex-1`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function FormComponent({ className, ...props }: Props) {
  const { mutate: submitData, isPending } = useCustomHook({
    onSuccess: () => {
      toast.success(messageData.success, { style: getToastStyle('success') });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || messageData.error, {
        style: getToastStyle('error'),
      });
    },
  });

  const form = useForm<FormType>({
    mode: 'all',
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // 기본값들
    },
  });

  useEffect(() => {
    form.trigger();
  }, [form]);

  const onSubmit = (data: FormType) => {
    submitData(data);
  };

  return (
    <Form {...form}>
      <form
        className={cn(cssVariants({}), className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <FormInput
          form={form}
          label="라벨"
          name="fieldName"
          type="text"
          placeholder="플레이스홀더"
          required
          disabled={isPending}
        />

        <SubmitButton>
          {isPending ? '처리 중...' : '제출'}
        </SubmitButton>
      </form>
    </Form>
  );
}
```

## 7. Import 및 Export 규칙

### Import 순서 규칙

1. **외부 라이브러리**
2. **Next.js 관련**
3. **React 관련**
4. **내부 컴포넌트 (UI → Form → Common → Entities)**
5. **DTO 및 타입 (@repo/dto, @repo/prisma)**
6. **유틸리티 및 헬퍼**

```typescript
// 1. 외부 라이브러리
import { zodResolver } from '@hookform/resolvers/zod';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

// 2. 내부 컴포넌트
import { FormInput } from '@/(common)/_components/form/FormInput';
import { SubmitButton } from '@/(common)/_components/form/SubmitButton';
import { Form } from '@/(common)/_components/ui/form';

// 3. 데이터 및 엔티티
import { messageData } from '@/_data/message.data';
import { useAuthActions } from '@/_entities/auth/auth.store';
import { useSignIn } from '@/_entities/auth/hooks';

// 4. DTO 및 타입
import { SignInSchema, SignInType } from '@repo/dto/formModel';
import type { UserInfo } from '@repo/prisma';

// 5. 유틸리티
import { cn, getToastStyle } from '@/_libs';
```

### Export 규칙

**명시적 export 사용 (export \* 금지):**

```typescript
// index.ts
export { SignInForm } from './SignInForm';
export { SignUpForm } from './SignUpForm';
export { AuthLayout } from './AuthLayout';
```

## 8. 에러 처리 및 메시지 규칙

### 토스트 메시지 처리

```typescript
// 성공 메시지
toast.success(messageData.auth.signInSuccess, {
  style: getToastStyle('success'),
});

// 에러 메시지
toast.error(error.response?.data?.message || messageData.auth.signInError, {
  style: getToastStyle('error'),
});
```

### 에러 메시지 우선순위

1. **API 응답 에러 메시지** (`error.response?.data?.message`)
2. **기본 에러 메시지** (`messageData.auth.signInError`)
3. **폴백 메시지** (하드코딩된 기본 메시지)

## 9. 성능 최적화 규칙

### 컴포넌트 최적화

- **React.memo** 사용 (필요시)
- **useCallback** 사용 (함수 참조 안정성)
- **useMemo** 사용 (계산 비용이 큰 연산)
- **lazy loading** 사용 (대용량 컴포넌트)

### 번들 최적화

- **동적 import** 사용 (필요시)
- **트리 쉐이킹** 고려한 import
- **사이즈 제한** 고려한 컴포넌트 분리

## 요약

이 가이드는 Next.js 프로젝트의 컴포넌트 작성에 대한 엄격한 규칙을 정의합니다. 모든 개발자는 이 규칙을 준수하여 일관성 있고 유지보수 가능한 코드를 작성해야 합니다.

**핵심 규칙:**

- 모든 컴포넌트는 CVA 구조를 따라야 함
- React Query 훅 사용 시 onSuccess, onError 처리는 컴포넌트에서 담당
- 파일 참조 전 구조 분석 절차 필수
- page.tsx는 최소한의 구조만 유지하고 별도 컴포넌트로 분리
- 명시적 export 사용 및 일관된 import 순서 준수
- **모든 폼 스키마는 @repo/dto에서 관리**
- **DTO 및 타입은 @repo/dto, @repo/prisma에서 import**
