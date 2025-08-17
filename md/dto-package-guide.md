# @repo/dto 패키지 가이드

## 목차

1. [패키지 개요](#패키지-개요)
2. [패키지 구조](#패키지-구조)
3. [Form Model (폼 모델)](#form-model-폼-모델)
4. [Data Transfer Object (DTO)](#data-transfer-object-dto)
5. [Response Types (응답 타입)](#response-types-응답-타입)
6. [사용법](#사용법)
7. [모범 사례](#모범-사례)
8. [모노레포 연동](#모노레포-연동)

## 패키지 개요

`@repo/dto`는 터보리포(Turborepo) 기반 모노레포에서 사용하는 데이터 전송 객체(DTO) 및 폼 모델 관리 패키지입니다. 프론트엔드와 백엔드에서 공통으로 사용하는 데이터 구조와 검증 스키마를 중앙화하여 관리합니다.

### 주요 특징

- **중앙화된 데이터 구조**: 프론트엔드와 백엔드에서 공통 사용
- **Zod 기반 검증**: 강력한 런타임 타입 검증
- **NestJS 통합**: `nestjs-zod`를 통한 DTO 자동 생성
- **Swagger 지원**: API 문서 자동 생성
- **타입 안전성**: TypeScript와 Zod의 완벽한 통합

## 패키지 구조

```
packages/dto/
├── package.json                    # 패키지 메타데이터
├── tsconfig.json                  # TypeScript 설정
├── eslint.config.mjs              # ESLint 설정
├── dist/                          # 빌드된 파일들
├── node_modules/                  # 의존성
└── src/
    ├── index.ts                   # 메인 export 파일
    ├── response.ts                # 응답 타입 정의
    ├── form-model/                # 폼 모델 (프론트엔드용)
    │   ├── index.ts
    │   ├── auth.form-model.ts     # 인증 관련 폼 모델
    │   └── users.form-model.ts    # 사용자 관련 폼 모델
    └── data-transfer-object/      # DTO (백엔드용)
        ├── index.ts
        ├── auth.ts                # 인증 관련 DTO
        └── users.ts               # 사용자 관련 DTO
```

### 패키지 메타데이터

```json
{
  "name": "@repo/dto",
  "version": "0.0.0",
  "private": true,
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    },
    "./formModel": {
      "types": "./dist/form-model/index.d.ts",
      "default": "./dist/form-model/index.js"
    },
    "./DTO": {
      "types": "./dist/data-transfer-object/index.d.ts",
      "default": "./dist/data-transfer-object/index.js"
    }
  }
}
```

## Form Model (폼 모델)

폼 모델은 프론트엔드에서 사용하는 Zod 스키마와 타입 정의입니다. 사용자 입력 검증과 폼 상태 관리를 위해 사용됩니다.

### 1. 인증 관련 폼 모델

```typescript
// auth.form-model.ts
import { UserRole } from '@repo/prisma';
import { z } from 'zod';

const emailSchema = z.email('올바른 이메일 형식을 입력해주세요.');

const passwordSchema = z
  .string()
  .min(10, '비밀번호는 10자 이상이어야 합니다.')
  .max(40, '비밀번호는 40자 이하이어야 합니다.')
  .regex(/[a-z]/, '비밀번호는 영문 소문자를 포함해야 합니다.')
  .regex(/[A-Z]/, '비밀번호는 영문 대문자를 포함해야 합니다.')
  .regex(/[0-9]/, '비밀번호는 숫자를 포함해야 합니다.')
  .regex(/[^a-zA-Z0-9]/, '비밀번호는 특수문자를 포함해야 합니다.');

// 회원가입 스키마 (폼용 - passwordConfirm 포함)
export const SignUpSchema = z
  .object({
    emlAddr: emailSchema,
    userNm: z.string().min(2, '사용자명은 2자 이상이어야 합니다.'),
    userRole: z.enum([UserRole.USER, UserRole.ADMIN]),
    password: passwordSchema,
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type SignUpType = z.infer<typeof SignUpSchema>;
```

### 2. 사용자 관련 폼 모델

```typescript
// users.form-model.ts
import { z } from 'zod';

export const UpdateUserSchema = z.object({
  userNm: z.string().min(2, '사용자명은 2자 이상이어야 합니다.'),
  userBiogp: z.string().optional(),
  proflImg: z.string().url().optional(),
});

export type UpdateUserType = z.infer<typeof UpdateUserSchema>;
```

### 3. 폼 모델 사용법

```typescript
// 프론트엔드에서 사용
import { SignUpSchema, SignUpType } from '@repo/dto/formModel';

// 폼 데이터 검증
const formData: SignUpType = {
  emlAddr: 'user@example.com',
  userNm: '홍길동',
  userRole: 'USER',
  password: 'Password123!',
  passwordConfirm: 'Password123!',
};

const result = SignUpSchema.safeParse(formData);
if (result.success) {
  // 검증 성공
  console.log('폼 데이터가 유효합니다:', result.data);
} else {
  // 검증 실패
  console.log('검증 오류:', result.error.errors);
}
```

## Data Transfer Object (DTO)

DTO는 백엔드에서 API 요청/응답 데이터를 처리하기 위한 클래스입니다. `nestjs-zod`를 사용하여 Zod 스키마로부터 자동 생성됩니다.

### 1. 인증 관련 DTO

```typescript
// auth.ts
import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';
import { SignUpSchema, SignInSchema } from '../form-model/auth.form-model';

// 회원가입 DTO용 스키마 (passwordConfirm 제외)
const SignUpDtoSchema = SignUpSchema.omit({ passwordConfirm: true });

// 회원가입 DTO
export class SignUpDto extends createZodDto(SignUpDtoSchema) {
  @ApiProperty({
    description: '사용자 이메일 주소',
    example: 'user@example.com',
  })
  declare emlAddr: string;

  @ApiProperty({
    description: '사용자 이름 (2자 이상)',
    example: '홍길동',
  })
  declare userNm: string;

  @ApiProperty({
    description: '사용자 역할',
    example: 'USER',
  })
  declare userRole: UserRole;

  @ApiProperty({
    description:
      '사용자 비밀번호 (10자 이상, 영문 대소문자, 숫자, 특수문자 포함)',
    example: 'Password123!',
  })
  declare password: string;
}

// 로그인 DTO
export class SignInDto extends createZodDto(SignInSchema) {
  @ApiProperty({
    description: '사용자 이메일 주소',
    example: 'user@example.com',
  })
  declare emlAddr: string;

  @ApiProperty({
    description: '사용자 비밀번호',
    example: 'Password123!',
  })
  declare password: string;
}
```

### 2. 사용자 관련 DTO

```typescript
// users.ts
import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateUserSchema } from '../form-model/users.form-model';

export class UpdateUserDto extends createZodDto(UpdateUserSchema) {
  @ApiProperty({
    description: '사용자 이름',
    example: '홍길동',
  })
  declare userNm: string;

  @ApiProperty({
    description: '사용자 소개',
    example: '안녕하세요! 개발자입니다.',
    required: false,
  })
  declare userBiogp?: string;

  @ApiProperty({
    description: '프로필 이미지 URL',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  declare proflImg?: string;
}
```

### 3. DTO 사용법

```typescript
// NestJS 컨트롤러에서 사용
import { SignUpDto, SignInDto } from '@repo/dto/DTO';

@Controller('auth')
export class AuthController {
  @Post('signup')
  async signUp(@Body() signUpData: SignUpDto) {
    // ZodValidationPipe가 자동으로 검증
    return this.authService.signUp(signUpData);
  }

  @Post('signin')
  async signIn(@Body() signInData: SignInDto) {
    return this.authService.signIn(signInData);
  }
}
```

## Response Types (응답 타입)

API 응답의 표준 형식을 정의합니다.

```typescript
// response.ts
export type SuccessPayload<T> = {
  status: number;
  data: T;
};

export type ErrorPayload = {
  status: number;
  message: string;
};
```

### 응답 타입 사용법

```typescript
// NestJS에서 사용
import { SuccessPayload, ErrorPayload } from '@repo/dto';

// 성공 응답
const successResponse: SuccessPayload<User> = {
  status: 200,
  data: {
    userId: 'uuid',
    emlAddr: 'user@example.com',
    userNm: '홍길동',
  },
};

// 에러 응답
const errorResponse: ErrorPayload = {
  status: 400,
  message: '잘못된 요청입니다.',
};
```

## 사용법

### 1. 프론트엔드에서 사용

```typescript
// React Hook Form과 함께 사용
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema, SignUpType } from '@repo/dto/formModel';

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = (data: SignUpType) => {
    // API 호출
    console.log('폼 데이터:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('emlAddr')} placeholder="이메일" />
      {errors.emlAddr && <span>{errors.emlAddr.message}</span>}

      <input {...register('userNm')} placeholder="사용자명" />
      {errors.userNm && <span>{errors.userNm.message}</span>}

      <input {...register('password')} type="password" placeholder="비밀번호" />
      {errors.password && <span>{errors.password.message}</span>}

      <input {...register('passwordConfirm')} type="password" placeholder="비밀번호 확인" />
      {errors.passwordConfirm && <span>{errors.passwordConfirm.message}</span>}

      <button type="submit">회원가입</button>
    </form>
  );
}
```

### 2. 백엔드에서 사용

```typescript
// NestJS에서 DTO 사용
import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { SignUpDto, SignInDto } from '@repo/dto/DTO';

@Controller('auth')
@UsePipes(ZodValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpData: SignUpDto) {
    // 자동으로 Zod 검증이 수행됨
    return this.authService.signUp(signUpData);
  }

  @Post('signin')
  async signIn(@Body() signInData: SignInDto) {
    return this.authService.signIn(signInData);
  }
}
```

### 3. 공통 타입 사용

```typescript
// 프론트엔드와 백엔드에서 공통으로 사용
import { SignUpType, SignInType } from '@repo/dto/formModel';

// 프론트엔드: 폼 데이터 타입
const formData: SignUpType = {
  emlAddr: 'user@example.com',
  userNm: '홍길동',
  userRole: 'USER',
  password: 'Password123!',
  passwordConfirm: 'Password123!',
};

// 백엔드: API 요청 타입
async function createUser(userData: Omit<SignUpType, 'passwordConfirm'>) {
  // passwordConfirm 제외하고 처리
  return await userService.create(userData);
}
```

## 모범 사례

### 1. 스키마 재사용

```typescript
// 공통 스키마 정의
const emailSchema = z.email('올바른 이메일 형식을 입력해주세요.');
const passwordSchema = z
  .string()
  .min(10, '비밀번호는 10자 이상이어야 합니다.')
  .regex(/[a-z]/, '비밀번호는 영문 소문자를 포함해야 합니다.')
  .regex(/[A-Z]/, '비밀번호는 영문 대문자를 포함해야 합니다.')
  .regex(/[0-9]/, '비밀번호는 숫자를 포함해야 합니다.')
  .regex(/[^a-zA-Z0-9]/, '비밀번호는 특수문자를 포함해야 합니다.');

// 여러 스키마에서 재사용
export const SignUpSchema = z.object({
  emlAddr: emailSchema,
  password: passwordSchema,
  passwordConfirm: z.string(),
});

export const SignInSchema = z.object({
  emlAddr: emailSchema,
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});
```

### 2. 조건부 검증

```typescript
// 조건부 필드 검증
export const UpdateUserSchema = z
  .object({
    userNm: z.string().min(2, '사용자명은 2자 이상이어야 합니다.'),
    userBiogp: z.string().optional(),
    proflImg: z.string().url('올바른 URL 형식을 입력해주세요.').optional(),
  })
  .refine(
    (data) => {
      // 사용자명이 변경되는 경우 소개도 함께 입력하도록 강제
      if (data.userNm && !data.userBiogp) {
        return false;
      }
      return true;
    },
    {
      message: '사용자명을 변경할 때는 소개도 함께 입력해주세요.',
      path: ['userBiogp'],
    },
  );
```

### 3. 에러 메시지 일관성

```typescript
// 일관된 에러 메시지 사용
const commonMessages = {
  required: '필수 입력 항목입니다.',
  email: '올바른 이메일 형식을 입력해주세요.',
  minLength: (field: string, min: number) =>
    `${field}은(는) ${min}자 이상이어야 합니다.`,
  maxLength: (field: string, max: number) =>
    `${field}은(는) ${max}자 이하여야 합니다.`,
};

export const UserSchema = z.object({
  userNm: z
    .string()
    .min(2, commonMessages.minLength('사용자명', 2))
    .max(20, commonMessages.maxLength('사용자명', 20)),
  emlAddr: z.string().email(commonMessages.email),
});
```

### 4. 타입 안전성 확보

```typescript
// 엄격한 타입 정의
interface UserRole {
  readonly USER: 'USER';
  readonly ADMIN: 'ADMIN';
}

const UserRole: UserRole = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export const UserSchema = z.object({
  userRole: z.enum([UserRole.USER, UserRole.ADMIN]),
});

export type User = z.infer<typeof UserSchema>;
```

## 모노레포 연동

### 1. 패키지 의존성 설정

**프론트엔드 (apps/web/package.json)**:

```json
{
  "dependencies": {
    "@repo/dto": "workspace:*"
  }
}
```

**백엔드 (apps/api/package.json)**:

```json
{
  "dependencies": {
    "@repo/dto": "workspace:*"
  }
}
```

### 2. TypeScript 경로 설정

**tsconfig.json**:

```json
{
  "compilerOptions": {
    "paths": {
      "@repo/dto": ["../../packages/dto"],
      "@repo/dto/*": ["../../packages/dto/*"]
    }
  }
}
```

### 3. 빌드 설정

**터보리포 설정 (turbo.json)**:

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}
```

## 요약

`@repo/dto` 패키지는 모노레포 환경에서 데이터 구조와 검증을 중앙화하여 관리하는 강력한 도구입니다. 주요 장점은 다음과 같습니다:

- **일관성**: 프론트엔드와 백엔드에서 동일한 데이터 구조 사용
- **타입 안전성**: TypeScript와 Zod를 통한 강력한 타입 검증
- **재사용성**: 공통 스키마와 타입의 효율적인 재사용
- **자동화**: NestJS와의 완벽한 통합으로 자동 검증
- **문서화**: Swagger를 통한 자동 API 문서 생성

이 패키지를 활용하면 프론트엔드와 백엔드 간의 데이터 일관성을 보장하고, 개발 생산성을 크게 향상시킬 수 있습니다.
