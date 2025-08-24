import type { UserInfo } from '@repo/prisma';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { usersKeys } from '@/_entities/users/users.keys';

interface UseGetUserByEmailOptions extends QueryOptionType<UserInfo> {}

/**
 * 이메일로 특정 사용자 정보를 가져오는 훅
 *
 * @param emlAddr - 조회할 사용자의 이메일 주소
 * @param options - 쿼리 옵션 (선택사항)
 * @returns 사용자 정보 조회 결과
 *
 * @example
 * ```typescript
 * const { user, loading, done } = useGetUserByEmail('user@example.com', {
 *   staleTime: 5 * 60 * 1000,
 *   onSuccess: (data) => {
 *     console.log('사용자 정보 로드 완료:', data);
 *   }
 * });
 * ```
 */
export function useGetUserByEmail(emlAddr: string, options?: UseGetUserByEmailOptions) {
  const {
    data: user,
    ...query
  } = useGet<UserInfo>({
    url: [ 'users', 'email', emlAddr, ],
    key: usersKeys.userByEmail(emlAddr),
    options,
  });

  return {
    user,
    ...query,
  };
}