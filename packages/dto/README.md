# @repo/dto

터보리포의 데이터 전송 객체(DTO) 및 폼 모델을 관리하는 패키지입니다.

## 구조

```
packages/dto/
├── src/
│   ├── index.ts                    # 전체 export
│   ├── response.ts                 # 공통 응답 타입
│   ├── form-model/                 # 폼 모델 (프론트엔드용)
│   │   ├── index.ts
│   │   ├── auth.form-model.ts      # 인증 관련 폼 스키마
│   │   └── users.form-model.ts     # 사용자 관련 폼 스키마
│   └── data-transfer-object/       # DTO 클래스 (백엔드용)
│       ├── index.ts
│       ├── auth.ts                 # 인증 관련 DTO
│       └── users.ts                # 사용자 관련 DTO
├── package.json
├── tsconfig.json
└── README.md
```

## 사용법

### 프론트엔드에서 폼 모델 사용

```typescript
// 폼 모델 import
import { SignUpSchema, SignUpType } from '@repo/dto/formModel';

// React Hook Form과 함께 사용
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function SignUpForm() {
  const form = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = (data: SignUpType) => {
    // 폼 데이터 처리
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* 폼 필드들 */}
    </form>
  );
}
```

### 백엔드에서 DTO 사용

```typescript
// DTO import
import { SignUpDto, SignInDto } from '@repo/dto/DTO';

// NestJS 컨트롤러에서 사용
import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    // DTO 데이터 처리
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    // DTO 데이터 처리
    return this.authService.signIn(signInDto);
  }
}
```

## 기본 제공 DTO

### 인증 관련 (Auth)

**폼 모델**:

- `SignUpSchema` / `SignUpType`: 회원가입 (비밀번호 확인 포함)
- `SignInSchema` / `SignInType`: 로그인
- `ForgotPasswordSchema` / `ForgotPasswordType`: 비밀번호 찾기
- `NewPasswordSchema` / `NewPasswordType`: 새 비밀번호 설정
- `ChangePasswordSchema` / `ChangePasswordType`: 비밀번호 변경

**DTO 클래스**:

- `SignUpDto`: 회원가입 (비밀번호 확인 제외)
- `SignInDto`: 로그인
- `ForgotPasswordDto`: 비밀번호 찾기
- `NewPasswordDto`: 새 비밀번호 설정
- `ChangePasswordDto`: 비밀번호 변경

### 사용자 관련 (Users)

**폼 모델**:

- `UpdateProfileSchema` / `UpdateProfileType`: 프로필 수정

**DTO 클래스**:

- `UpdateProfileDto`: 프로필 수정

## 새로운 DTO 추가 방법

### 1. 폼 모델 추가

`src/form-model/[도메인명].form-model.ts` 파일을 생성하고 Zod 스키마를 정의합니다.

```typescript
// src/form-model/posts.form-model.ts
import { z } from 'zod';

export const CreatePostSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(10, '내용은 10자 이상이어야 합니다.'),
  category: z.string().optional(),
});

export type CreatePostType = z.infer<typeof CreatePostSchema>;

export const UpdatePostSchema = CreatePostSchema.partial();
export type UpdatePostType = z.infer<typeof UpdatePostSchema>;
```

### 2. 폼 모델 export 추가

`src/form-model/index.ts`에 새로운 모델을 export합니다.

```typescript
// src/form-model/index.ts
export * from './auth.form-model';
export * from './users.form-model';
export * from './posts.form-model'; // 새로 추가
```

### 3. DTO 클래스 추가

`src/data-transfer-object/[도메인명].ts` 파일을 생성하고 DTO 클래스를 정의합니다.

```typescript
// src/data-transfer-object/posts.ts
import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';

import {
  CreatePostSchema,
  UpdatePostSchema,
} from '../form-model/posts.form-model';

export class CreatePostDto extends createZodDto(CreatePostSchema) {
  @ApiProperty({
    description: '게시글 제목',
    example: '안녕하세요',
  })
  declare title: string;

  @ApiProperty({
    description: '게시글 내용',
    example: '게시글 내용입니다.',
  })
  declare content: string;

  @ApiProperty({
    description: '게시글 카테고리',
    example: '기술',
    required: false,
  })
  declare category?: string;
}

export class UpdatePostDto extends createZodDto(UpdatePostSchema) {
  @ApiProperty({
    description: '게시글 제목',
    example: '안녕하세요',
    required: false,
  })
  declare title?: string;

  @ApiProperty({
    description: '게시글 내용',
    example: '게시글 내용입니다.',
    required: false,
  })
  declare content?: string;

  @ApiProperty({
    description: '게시글 카테고리',
    example: '기술',
    required: false,
  })
  declare category?: string;
}
```

### 4. DTO export 추가

`src/data-transfer-object/index.ts`에 새로운 DTO를 export합니다.

```typescript
// src/data-transfer-object/index.ts
export * from './auth';
export * from './users';
export * from './posts'; // 새로 추가
```

### 5. 전체 export 추가

`src/index.ts`에 새로운 모듈을 export합니다.

```typescript
// src/index.ts
export * from './response';
export * from './form-model';
export * from './data-transfer-object';
// 새로운 모듈이 form-model과 data-transfer-object에 포함되어 있으므로
// 별도 추가는 필요 없음
```

## 패키지 정보

- **패키지명**: `@repo/dto`
- **버전**: 0.0.0
- **라이선스**: MIT
- **타입**: Private

### Export 설정

```json
{
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

## 개발 가이드

### 네이밍 규칙

- **폼 모델**: `[도메인명].form-model.ts`
- **DTO 클래스**: `[도메인명].ts`
- **스키마**: `[동작][도메인]Schema` (예: `CreatePostSchema`)
- **타입**: `[동작][도메인]Type` (예: `CreatePostType`)
- **DTO 클래스**: `[동작][도메인]Dto` (예: `CreatePostDto`)

### 유효성 검사 규칙

- **이메일**: `z.email()` 사용
- **비밀번호**: 복잡성 검사 (영문 대소문자, 숫자, 특수문자)
- **문자열**: 최소/최대 길이 제한
- **선택적 필드**: `.optional()` 사용

### Swagger 문서화

모든 DTO 클래스에는 `@ApiProperty` 데코레이터를 사용하여 Swagger 문서를 생성합니다.

```typescript
@ApiProperty({
  description: '필드 설명',
  example: '예시 값',
  required: false, // 선택적 필드인 경우
})
declare fieldName: string;
```

## 요약

이 패키지는 프론트엔드와 백엔드 간의 데이터 전송을 위한 타입 안전한 DTO와 폼 모델을 제공합니다. Zod를 기반으로 한 스키마 검증과 NestJS와의 통합을 지원하며, 새로운 DTO 추가 시 일관된 구조를 유지할 수 있도록 가이드를 제공합니다.
