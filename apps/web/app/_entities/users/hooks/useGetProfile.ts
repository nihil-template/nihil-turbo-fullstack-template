import type { UserInfo } from '@repo/prisma';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { usersKeys } from '@/_entities/users/users.keys';

interface UseGetProfileOptions extends QueryOptionType<UserInfo> {}

/**
 * 현재 로그인된 사용자의 프로필 정보를 가져오는 훅
 *
 * @param options - 쿼리 옵션 (선택사항)
 * @returns 프로필 정보 조회 결과
 *
 * @example
 * ```typescript
 * const { profile, loading, done } = useGetProfile({
 *   staleTime: 5 * 60 * 1000,
 *   onSuccess: (data) => {
 *     console.log('프로필 정보 로드 완료:', data);
 *   }
 * });
 * ```
 */
export function useGetProfile(options?: UseGetProfileOptions) {
  const {
    data: profile,
    ...query
  } = useGet<UserInfo>({
    url: [ 'users', 'profile', ],
    key: usersKeys.profile(),
    options,
  });

  return {
    profile,
    ...query,
  };
}
