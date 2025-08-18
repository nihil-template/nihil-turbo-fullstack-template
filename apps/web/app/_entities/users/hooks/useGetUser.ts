import type { UserInfo } from '@repo/prisma';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { usersKeys } from '@/_entities/users/users.keys';

interface UseGetUserOptions extends QueryOptionType<UserInfo> {}

/**
 * 특정 사용자 정보를 가져오는 훅
 *
 * @param userId - 조회할 사용자의 ID
 * @param options - 쿼리 옵션 (선택사항)
 * @returns 사용자 정보 조회 결과
 *
 * @example
 * ```typescript
 * const { user, loading, done } = useGetUser('user-id', {
 *   staleTime: 5 * 60 * 1000,
 *   onSuccess: (data) => {
 *     console.log('사용자 정보 로드 완료:', data);
 *   }
 * });
 * ```
 */
export function useGetUser(userId: string, options?: UseGetUserOptions) {
  const {
    data: user,
    ...query
  } = useGet<UserInfo>({
    url: [ 'users', userId, ],
    key: usersKeys.user(userId),
    options,
  });

  return {
    user,
    ...query,
  };
}
