import type { UserInfo } from '@repo/prisma';

import { useGet } from '@/_entities/common/hooks';
import { usersKeys } from '@/_entities/users/users.keys';

/**
 * 현재 로그인된 사용자의 프로필 정보를 가져오는 훅
 */
export function useGetProfile() {
  const {
    data: profile,
    ...query
  } = useGet<UserInfo>({
    url: [ 'users', 'profile', ],
    key: usersKeys.profile(),
  });

  return {
    profile,
    ...query,
  };
}
