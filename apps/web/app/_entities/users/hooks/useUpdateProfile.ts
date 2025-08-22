import type { UserInfo } from '@repo/prisma';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks/api/use-put';
import { usersKeys } from '@/_entities/users/users.keys';
import type { UpdateProfileData } from '@/_entities/users/users.types';

interface UseUpdateProfileOptions
  extends MutationOptionsType<UserInfo, UpdateProfileData> { }

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
 * const handleUpdateProfile = async (profileData: UpdateProfileData) => {
 *   try {
 *     await updateProfile.mutateAsync(profileData);
 *     // 성공 처리
 *   } catch (error) {
 *     // 에러 처리
 *   }
 * };
 * ```
 */
export function useUpdateProfile(options: UseUpdateProfileOptions = {}) {
  return usePut<UserInfo, UpdateProfileData>({
    url: [ 'users', 'profile', ],
    key: usersKeys.profile(),
    options: {
      onSuccess: (data, variables, context) => {
        // 프로필 업데이트 성공 시 관련 쿼리 무효화
        options.onSuccess?.(data, variables, context);
      },
      onError: options.onError,
      ...options,
    },
  });
}
