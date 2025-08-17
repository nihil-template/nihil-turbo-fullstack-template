import type { UserInfo } from '@repo/prisma';

import { usePut } from '@/_entities/common/hooks';
import { usersKeys } from '@/_entities/users/users.keys';
import type { UpdateProfileData } from '@/_entities/users/users.types';

/**
 * 사용자 프로필 정보 수정을 위한 커스텀 훅
 */
export function useUpdateProfile() {
  const query = usePut<UserInfo, UpdateProfileData>({
    url: [ 'users', 'profile', ],
    key: usersKeys.profile(),
  });

  return query;
}
