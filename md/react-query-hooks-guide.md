# React Query 커스텀 훅 작성 규칙 가이드

## 개요

이 문서는 Next.js 15 풀스택 템플릿 프로젝트의 React Query 커스텀 훅 작성 규칙을 정의합니다. 모든 훅은 일관성과 타입 안전성을 위해 엄격한 규칙을 따라야 합니다.

## 폴더 구조 규칙

### 엔티티별 훅 구조

```
app/_entities/
├── [entity]/
│   ├── hooks/
│   │   ├── useGet[Entity].ts      # GET 요청 훅
│   │   ├── useCreate[Entity].ts   # POST 요청 훅
│   │   ├── useUpdate[Entity].ts   # PATCH/PUT 요청 훅
│   │   ├── useDelete[Entity].ts   # DELETE 요청 훅
│   │   └── index.ts               # 명시적 export
│   ├── [entity].types.ts          # 타입 정의
│   ├── [entity].keys.ts           # 쿼리 키 정의
│   └── [entity].store.ts          # 상태 관리
└── common/
    ├── hooks/
    │   ├── api/                   # 기본 API 훅들
    │   │   ├── use-get.ts
    │   │   ├── use-post.ts
    │   │   ├── use-patch.ts
    │   │   ├── use-put.ts
    │   │   └── use-delete.ts
    │   ├── use-done.ts
    │   ├── use-loading.ts
    │   └── index.ts
    └── common.types.ts            # 공통 타입 정의
```

## 1. 기본 API 훅 사용 규칙

### 모든 커스텀 훅은 기본 API 훅을 래핑하여 사용

**사용 가능한 기본 훅들:**

- `useGet<T>` - GET 요청
- `useGetInfinite<T>` - 무한 스크롤 GET 요청
- `usePost<TData, TVariables>` - POST 요청
- `usePatch<TData, TVariables>` - PATCH 요청
- `usePut<TData, TVariables>` - PUT 요청
- `useDelete<TData, TVariables>` - DELETE 요청

### 기본 훅 사용 예시

```typescript
// GET 요청
const { data, loading, done } = useGet<UserInfo[]>({
  url: ['api', 'users'],
  key: usersKeys.all(),
  params: { page: 1, limit: 10 },
  options: {
    staleTime: 5 * 60 * 1000,
  },
});

// POST 요청
const createUser = usePost<UserInfo, CreateUserRequest>({
  url: ['api', 'users'],
  key: usersKeys.all(),
  options: {
    onSuccess: (data) => {
      console.log('사용자 생성 성공:', data);
    },
  },
});
```

## 2. GET 요청 훅 작성 규칙

### 훅 함수명 규칙

- **단일 조회**: `useGet[Entity]` (예: `useGetUser`)
- **목록 조회**: `useGet[Entity]s` (예: `useGetUsers`)
- **무한 스크롤**: `useGet[Entity]sInfinite` (예: `useGetUsersInfinite`)

### GET 훅 작성 템플릿

**⚠️ 중요: 모든 GET 훅은 반드시 옵션 매개변수를 받아야 합니다.**

````typescript
import type { UserInfo } from '@repo/prisma';

import { usersKeys } from '@/_entities/users/users.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';

interface UseGetUserOptions extends QueryOptionType<UserInfo> {}

/**
 * 사용자 정보 조회를 위한 커스텀 훅
 *
 * @param userId - 조회할 사용자 ID
 * @param options - 쿼리 옵션 (선택사항)
 * @returns 사용자 정보 조회 결과
 *
 * @example
 * ```typescript
 * const { data: user, loading, done } = useGetUser('user-id', {
 *   staleTime: 5 * 60 * 1000
 * });
 * ```
 */
export function useGetUser(userId: string, options?: UseGetUserOptions) {
  const {
    data: user,
    loading,
    done,
    ...other
  } = useGet<UserInfo>({
    url: ['api', 'users', userId],
    key: usersKeys.detail(userId),
    options,
  });

  return {
    user,
    loading,
    done,
    ...other,
  };
}
````

### 목록 조회 훅 예시

```typescript
interface UseGetUsersOptions extends QueryOptionType<UserInfo[]> {}

export function useGetUsers(
  params?: PaginationParams,
  options?: UseGetUsersOptions,
) {
  const {
    data: users,
    loading,
    done,
    ...other
  } = useGet<UserInfo[]>({
    url: ['api', 'users'],
    key: usersKeys.list(params),
    params,
    options,
  });

  return {
    users,
    loading,
    done,
    ...other,
  };
}
```

### 무한 스크롤 훅 예시

```typescript
export function useGetUsersInfinite(
  params?: PaginationParams,
  options?: InfiniteQueryOptionType<UserInfo[]>,
) {
  const {
    data: users,
    loading,
    done,
    fetchNextPage,
    hasNextPage,
    ...other
  } = useGetInfinite<UserInfo[]>({
    url: ['api', 'users'],
    key: usersKeys.lists(),
    params,
    options,
  });

  return {
    users,
    loading,
    done,
    fetchNextPage,
    hasNextPage,
    ...other,
  };
}
```

## 3. MUTATION (POST/PATCH/PUT/DELETE) 훅 작성 규칙

### 훅 함수명 규칙

- **생성**: `useCreate[Entity]` (예: `useCreateUser`)
- **수정**: `useUpdate[Entity]` (예: `useUpdateUser`)
- **삭제**: `useDelete[Entity]` (예: `useDeleteUser`)

### MUTATION 훅 작성 템플릿

**⚠️ 중요: 모든 MUTATION 훅은 반드시 옵션 매개변수를 받아야 합니다.**

````typescript
import type { UserInfo } from '@repo/prisma';

import { usersKeys } from '@/_entities/users/users.keys';
import type { CreateUserRequest } from '@/_entities/users/users.types';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';

interface UseCreateUserOptions
  extends MutationOptionsType<UserInfo, CreateUserRequest> {}

/**
 * 사용자 생성을 위한 커스텀 훅
 *
 * @param options - 뮤테이션 옵션 (선택사항)
 * @returns 사용자 생성 뮤테이션 객체
 *
 * @example
 * ```typescript
 * const createUser = useCreateUser({
 *   onSuccess: (data) => {
 *     console.log('사용자 생성 성공:', data);
 *   },
 *   onError: (error) => {
 *     console.error('사용자 생성 실패:', error);
 *   }
 * });
 *
 * const handleCreateUser = async (userData: CreateUserRequest) => {
 *   try {
 *     await createUser.mutateAsync(userData);
 *     // 성공 처리
 *   } catch (error) {
 *     // 에러 처리
 *   }
 * };
 * ```
 */
export function useCreateUser(options: UseCreateUserOptions = {}) {
  const query = usePost<UserInfo, CreateUserRequest>({
    url: ['api', 'users'],
    key: usersKeys.all(),
    options,
  });

  return query;
}
````

### 수정 훅 예시

```typescript
interface UseUpdateUserOptions
  extends MutationOptionsType<
    UserInfo,
    { id: string; data: UpdateUserRequest }
  > {}

export function useUpdateUser(options: UseUpdateUserOptions = {}) {
  const query = usePost<UserInfo, { id: string; data: UpdateUserRequest }>({
    url: ['api', 'users'],
    key: usersKeys.all(),
    options: {
      onSuccess: (data, variables) => {
        // 상세 조회 쿼리도 무효화
        queryClient.invalidateQueries({
          queryKey: usersKeys.detail(variables.id),
        });
      },
      ...options,
    },
  });

  return query;
}
```

### 삭제 훅 예시

```typescript
interface UseDeleteUserOptions extends MutationOptionsType<null, string> {}

export function useDeleteUser(options: UseDeleteUserOptions = {}) {
  const query = useDelete<null, string>({
    url: ['api', 'users'],
    key: usersKeys.all(),
    options,
  });

  return query;
}
```

## 4. 쿼리 키 관리 규칙

### 쿼리 키 구조

```typescript
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const usersKeys = createQueryKeys('users', {
  // ===== GET Queries =====
  all: () => ['all'],
  lists: () => [...usersKeys.all(), 'list'],
  list: (filters: string) => [...usersKeys.lists(), { filters }],
  details: () => [...usersKeys.all(), 'detail'],
  detail: (id: string) => [...usersKeys.details(), id],

  // ===== POST Mutations =====
  create: () => ['create'],
  update: () => ['update'],
  delete: () => ['delete'],
});
```

### 쿼리 키 사용 규칙

- **목록 조회**: `usersKeys.all()` 또는 `usersKeys.list(params)`
- **상세 조회**: `usersKeys.detail(id)`
- **무한 스크롤**: `usersKeys.lists()`
- **뮤테이션**: `usersKeys.all()` (성공 시 목록 무효화)

## 5. 타입 정의 규칙

### 엔티티별 타입 파일 구조

```typescript
// users.types.ts
import type { UserInfo } from '@repo/prisma';
import type { CreateUserDto, UpdateUserDto } from '@repo/dto';

// 백엔드 DTO와 매핑
export type CreateUserRequest = CreateUserDto;
export type UpdateUserRequest = UpdateUserDto;

// 응답 타입
export type UserResponse = UserInfo;

// 쿼리 파라미터 타입
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}
```

### 타입 사용 규칙

- **요청 데이터**: 백엔드 DTO와 동일한 구조 사용
- **응답 데이터**: Prisma 모델 타입 사용
- **옵션 타입**: `QueryOptionType<T>` 또는 `MutationOptionsType<TData, TVariables>` 사용

## 6. 에러 처리 규칙

### 에러 타입 통일

```typescript
import type { AxiosError } from 'axios';
import type { ErrorPayload } from '@repo/dto';

// 모든 에러는 AxiosError<ErrorPayload> 타입 사용
type ApiError = AxiosError<ErrorPayload>;
```

### 에러 처리 패턴

```typescript
// 컴포넌트에서 에러 처리
const createUser = useCreateUser({
  onSuccess: (data) => {
    toast.success('사용자가 생성되었습니다.');
  },
  onError: (error) => {
    toast.error(error.response?.data?.message || '사용자 생성에 실패했습니다.');
  },
});
```

## 7. 무효화 전략 규칙

### 무효화 우선순위

1. **CREATE**: 목록 쿼리만 무효화
2. **UPDATE**: 목록 + 상세 쿼리 무효화
3. **DELETE**: 목록 쿼리만 무효화

### 무효화 예시

```typescript
export function useUpdateUser(options: UseUpdateUserOptions = {}) {
  const queryClient = useQueryClient();

  return usePost<UserInfo, { id: string; data: UpdateUserRequest }>({
    url: ['api', 'users'],
    key: usersKeys.all(),
    options: {
      onSuccess: (data, variables) => {
        // 목록 쿼리 무효화
        queryClient.invalidateQueries({
          queryKey: usersKeys.all(),
        });
        // 상세 쿼리 무효화
        queryClient.invalidateQueries({
          queryKey: usersKeys.detail(variables.id),
        });
      },
      ...options,
    },
  });
}
```

## 8. 문서화 규칙

### JSDoc 필수 요소

````typescript
/**
 * [훅 설명]
 *
 * @param [매개변수명] - [매개변수 설명]
 * @param options - [옵션 설명] (선택사항)
 * @returns [반환값 설명]
 *
 * @example
 * ```typescript
 * [사용 예시 코드]
 * ```
 */
````

### 문서화 예시

````typescript
/**
 * 사용자 정보 조회를 위한 커스텀 훅
 * 사용자 ID를 기반으로 단일 사용자 정보를 조회합니다.
 *
 * @param userId - 조회할 사용자 ID
 * @param options - 쿼리 옵션 (선택사항)
 * @returns 사용자 정보 조회 결과 (data, loading, done, ...)
 *
 * @example
 * ```typescript
 * const { data: user, loading, done } = useGetUser('user-id', {
 *   staleTime: 5 * 60 * 1000,
 *   onSuccess: (data) => {
 *     console.log('사용자 정보 로드 완료:', data);
 *   }
 * });
 * ```
 */
````

## 9. 성능 최적화 규칙

### 캐싱 전략

```typescript
// 자주 변경되지 않는 데이터
const { data: user } = useGetUser(userId, {
  staleTime: 10 * 60 * 1000, // 10분
  gcTime: 30 * 60 * 1000, // 30분
});

// 실시간 데이터
const { data: notifications } = useGetNotifications({
  staleTime: 0, // 즉시 stale
  refetchInterval: 30000, // 30초마다 재조회
});
```

### 조건부 쿼리

```typescript
export function useGetUser(userId?: string, options?: UseGetUserOptions) {
  const {
    data: user,
    loading,
    done,
    ...other
  } = useGet<UserInfo>({
    url: ['api', 'users', userId],
    key: usersKeys.detail(userId),
    options: {
      enabled: !!userId, // userId가 있을 때만 실행
      ...options,
    },
  });

  return {
    user,
    loading,
    done,
    ...other,
  };
}
```

## 10. 테스트 규칙

### 훅 테스트 구조

```typescript
// __tests__/hooks/useGetUser.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetUser } from '@/_entities/users/hooks';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useGetUser', () => {
  it('사용자 정보를 성공적으로 조회한다', async () => {
    const { result } = renderHook(() => useGetUser('user-id'), { wrapper });

    await waitFor(() => {
      expect(result.current.done).toBe(true);
    });

    expect(result.current.user).toBeDefined();
  });
});
```

## 11. 옵션 매개변수 필수 규칙

### ⚠️ 모든 커스텀 훅은 반드시 옵션 매개변수를 받아야 합니다

**GET 훅:**

```typescript
// ✅ 올바른 예시
export function useGetUser(userId: string, options?: UseGetUserOptions) {
  // ...
}

// ❌ 잘못된 예시
export function useGetUser(userId: string) {
  // ...
}
```

**MUTATION 훅:**

```typescript
// ✅ 올바른 예시
export function useCreateUser(options: UseCreateUserOptions = {}) {
  // ...
}

// ❌ 잘못된 예시
export function useCreateUser() {
  // ...
}
```

### 옵션 타입 정의 규칙

```typescript
// GET 훅 옵션
interface UseGetUserOptions extends QueryOptionType<UserInfo> {}

// MUTATION 훅 옵션
interface UseCreateUserOptions
  extends MutationOptionsType<UserInfo, CreateUserRequest> {}
```

### 옵션 사용 예시

```typescript
// 컴포넌트에서 사용
const { user, loading } = useGetUser('user-id', {
  staleTime: 5 * 60 * 1000,
  onSuccess: (data) => {
    console.log('사용자 정보 로드 완료:', data);
  },
  onError: (error) => {
    console.error('사용자 정보 로드 실패:', error);
  },
});

const createUser = useCreateUser({
  onSuccess: (data) => {
    toast.success('사용자가 생성되었습니다.');
  },
  onError: (error) => {
    toast.error('사용자 생성에 실패했습니다.');
  },
});
```

## 요약

이 가이드는 React Query 커스텀 훅 작성에 대한 엄격한 규칙을 정의합니다. 모든 개발자는 이 규칙을 준수하여 일관성 있고 타입 안전한 훅을 작성해야 합니다.

**핵심 규칙:**

- **모든 훅은 기본 API 훅을 래핑하여 사용**
- **모든 커스텀 훅은 반드시 옵션 매개변수를 받아야 함**
- **타입 안전성을 위한 제네릭 사용 필수**
- **쿼리 키는 `@lukemorales/query-key-factory`로 관리**
- **백엔드 DTO와 프론트엔드 타입을 명확히 분리**
- **JSDoc을 통한 상세한 문서화 필수**
- **에러 처리는 `AxiosError<ErrorPayload>` 타입 사용**
- **무효화 전략에 따른 정확한 쿼리 무효화**
- **성능 최적화를 위한 캐싱 전략 적용**
