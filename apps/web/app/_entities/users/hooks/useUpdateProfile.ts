import type { UserInfo } from '@repo/prisma';
import { useQueryClient } from '@tanstack/react-query';

import { authKeys } from '@/_entities/auth/auth.keys';
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
  const queryClient = useQueryClient();

  return usePut<UserInfo, UpdateProfileData>({
    url: [ 'users', 'profile', ],
    key: usersKeys.profile(),
    options: {
      onSuccess: (data, variables, context) => {
        // 프로필 업데이트 성공 시 관련 쿼리 무효화
        // 세션 정보도 함께 무효화하여 UI가 즉시 업데이트되도록 함
        queryClient.invalidateQueries({
          queryKey: authKeys.session().queryKey,
        });
        queryClient.invalidateQueries({
          queryKey: usersKeys.profile().queryKey,
        });
        options.onSuccess?.(data, variables, context);
      },
      onError: options.onError,
      ...options,
    },
  });
}
