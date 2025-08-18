import type { UserInfo } from '@repo/prisma';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks';
import { usersKeys } from '@/_entities/users/users.keys';
import type { UpdateProfileData } from '@/_entities/users/users.types';

interface UseUpdateProfileOptions
  extends MutationOptionsType<UserInfo, { id: string; data: UpdateProfileData }> {}

/**
 * 사용자 프로필 정보 수정을 위한 커스텀 훅
 *
 * @param options - 뮤테이션 옵션 (선택사항)
 * @returns 프로필 수정 뮤테이션 객체
 *
 * @example
 * ```typescript
 * const updateProfile = useUpdateProfile({
 *   onSuccess: (data) => {
 *     console.log('프로필 수정 성공:', data);
 *   },
 *   onError: (error) => {
 *     console.error('프로필 수정 실패:', error);
 *   }
 * });
 *
 * const handleUpdateProfile = async (id: string, profileData: UpdateProfileData) => {
 *   try {
 *     await updateProfile.mutateAsync({ id, data: profileData });
 *     // 성공 처리
 *   } catch (error) {
 *     // 에러 처리
 *   }
 * };
 * ```
 */
export function useUpdateProfile(options: UseUpdateProfileOptions = {}) {
  const query = usePut<UserInfo, { id: string; data: UpdateProfileData }>({
    url: [ 'users', 'profile', ],
    key: usersKeys.profile(),
    options,
  });

  return query;
}
