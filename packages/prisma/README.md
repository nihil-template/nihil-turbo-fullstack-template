# @repo/prisma

터보리포의 Prisma 클라이언트 및 데이터베이스 타입을 관리하는 패키지입니다.

## 구조

```
packages/prisma/
├── src/
│   └── generated/
│       └── client/              # Prisma 클라이언트 생성 파일들
│           ├── index.d.ts       # 타입 정의
│           ├── index.js         # 클라이언트 구현
│           ├── schema.prisma    # 스키마 파일
│           └── runtime/         # 런타임 파일들
├── package.json
├── tsconfig.json
└── README.md
```

## 사용법

### 데이터베이스 타입 사용

```typescript
// Prisma 클라이언트 import
import { PrismaClient, UserInfo, UserCertInfo, UserRole } from '@repo/prisma';

// 클라이언트 인스턴스 생성
const prisma = new PrismaClient();

// 타입 사용 예시
async function createUser(userData: {
  emlAddr: string;
  userNm: string;
  userRole: UserRole;
}) {
  const user = await prisma.userInfo.create({
    data: userData,
  });
  return user;
}

// 타입 정의에서 사용
type UserWithCert = UserInfo & {
  UserCertInfo: UserCertInfo | null;
};
```

### 다른 패키지에서 타입 사용

```typescript
// DTO 패키지에서 사용
import { UserRole } from '@repo/prisma';

export const SignUpSchema = z.object({
  emlAddr: z.string().email(),
  userNm: z.string().min(2),
  userRole: z.enum([UserRole.USER, UserRole.ADMIN]),
  password: z.string().min(10),
});
```

## 기본 제공 타입

### 모델 타입

- `UserInfo`: 사용자 정보 모델
- `UserCertInfo`: 사용자 인증 정보 모델

### 열거형 타입

- `UserRole`: 사용자 역할 (USER, ADMIN)

### 스키마 정보

**UserInfo 모델**:

- `userId`: UUID (기본키)
- `emlAddr`: 이메일 주소 (고유)
- `userNm`: 사용자명 (고유)
- `userRole`: 사용자 역할 (기본값: USER)
- `proflImg`: 프로필 이미지 (선택)
- `userBiogp`: 사용자 소개 (선택)
- `actvtnYn`: 활성화 여부 (기본값: true)
- `lastLgnDt`: 마지막 로그인 날짜 (선택)
- `crtDt`: 생성 날짜
- `updtDt`: 수정 날짜
- `delDt`: 삭제 날짜 (선택)

**UserCertInfo 모델**:

- `userCertId`: UUID (기본키)
- `userId`: 사용자 ID (외래키)
- `encptPswd`: 암호화된 비밀번호
- `reshToken`: 리프레시 토큰 (선택)
- `delYn`: 삭제 여부 (기본값: false)
- `crtDt`: 생성 날짜
- `updtDt`: 수정 날짜
- `delDt`: 삭제 날짜 (선택)

## 스키마 관리

### ⚠️ 중요: 스키마 수정 위치

**스키마 파일은 API 프로젝트에서 관리됩니다.**

- **스키마 파일 위치**: `apps/api/prisma/schema.prisma`
- **이 패키지**: 생성된 클라이언트와 타입만 제공

### 스키마 변경 시 업데이트 방법

1. **API 프로젝트에서 스키마 수정**:

   ```bash
   cd apps/api
   # schema.prisma 파일 수정
   ```

2. **Prisma 클라이언트 재생성**:

   ```bash
   cd apps/api
   pnpm prisma generate
   ```

3. **생성된 파일들이 이 패키지로 복사됨**:
   - `apps/api/node_modules/.prisma/client/` → `packages/prisma/src/generated/client/`

### 스키마 작성 규칙

**모델 네이밍**:

- 모델명: PascalCase (예: `UserInfo`)
- 테이블명: snake_case (예: `user_info`)

**필드 네이밍**:

- 필드명: camelCase (예: `emlAddr`)
- 컬럼명: snake_case (예: `eml_addr`)

**기본 규칙**:

- 모든 모델은 `uuid`를 기본키로 사용
- `@@map`을 사용하여 테이블명 매핑
- 관계 설정 시 `onDelete: Cascade` 사용
- 메타데이터 필드 포함 (`crtDt`, `updtDt`, `delDt`)

## 패키지 정보

- **패키지명**: `@repo/prisma`
- **버전**: 0.0.0
- **라이선스**: MIT
- **타입**: Private

### Export 설정

```json
{
  "main": "./src/generated/client/index.js",
  "types": "./src/generated/client/index.d.ts"
}
```

## 개발 가이드

### 새로운 모델 추가

1. **API 프로젝트의 스키마 수정**:

   ```prisma
   // apps/api/prisma/schema.prisma
   model Post {
     postId    String   @id @default(uuid()) @map("post_id")
     title     String   @map("title")
     content   String   @map("content")
     userId    String   @map("user_id")
     user      UserInfo @relation(fields: [userId], references: [userId])

     // 메타데이터
     crtDt     DateTime @default(now()) @map("crt_dt")
     updtDt    DateTime @updatedAt @map("updt_dt")
     delDt     DateTime? @map("del_dt")

     @@map("post")
   }
   ```

2. **클라이언트 재생성**:

   ```bash
   cd apps/api
   pnpm prisma generate
   ```

3. **타입 사용**:

   ```typescript
   import { Post } from '@repo/prisma';

   type PostWithUser = Post & {
     user: UserInfo;
   };
   ```

### 마이그레이션

마이그레이션은 API 프로젝트에서 수행합니다:

```bash
cd apps/api
pnpm prisma migrate dev --name add_post_model
```

### 데이터베이스 시드

시드 파일도 API 프로젝트에서 관리합니다:

```bash
cd apps/api
pnpm prisma db seed
```

## 요약

이 패키지는 Prisma 클라이언트와 데이터베이스 타입을 중앙화하여 관리합니다. 스키마 수정은 API 프로젝트에서 진행하며, 이 패키지는 생성된 타입과 클라이언트를 다른 패키지에서 사용할 수 있도록 제공합니다. 모든 데이터베이스 관련 타입은 이 패키지를 통해 일관되게 관리됩니다.
