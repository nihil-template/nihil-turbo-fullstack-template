import type { UserInfo } from '@repo/prisma';

import { useGet } from '@/_entities/common/hooks';
import { usersKeys } from '@/_entities/users/users.keys';

/**
 * 특정 사용자 정보를 가져오는 훅
 * @param userId - 조회할 사용자의 ID
 */
export function useGetUser(userId: string) {
  const {
    data: user,
    ...query
  } = useGet<UserInfo>({
    url: [ 'users', userId, ],
    key: usersKeys.user(userId),
  });

  return {
    user,
    ...query,
  };
}
