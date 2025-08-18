import { authKeys } from '@/_entities/auth/auth.keys';
import type { ChangePasswordData } from '@/_entities/auth/auth.types';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';

interface UseChangePasswordOptions extends MutationOptionsType<null, ChangePasswordData> {}

/**
 * 로그인된 사용자의 비밀번호 변경을 위한 커스텀 훅
 *
 * @param options - 뮤테이션 옵션 (선택사항)
 * @returns 비밀번호 변경 뮤테이션 객체
 *
 * @example
 * ```typescript
 * const changePassword = useChangePassword({
 *   onSuccess: () => {
 *     console.log('비밀번호 변경 성공');
 *   },
 *   onError: (error) => {
 *     console.error('비밀번호 변경 실패:', error);
 *   }
 * });
 *
 * const handleChangePassword = async (currentPassword: string, newPassword: string) => {
 *   try {
 *     await changePassword.mutateAsync({
 *       currentPassword,
 *       newPassword,
 *     });
 *     // 비밀번호 변경 성공 처리
 *   } catch (error) {
 *     // 에러 처리
 *   }
 * };
 * ```
 */
export function useChangePassword(options: UseChangePasswordOptions = {}) {
  const query = usePost<null, ChangePasswordData>({
    url: [ 'auth', 'change-password', ],
    key: authKeys.changePassword(),
    options,
  });

  return query;
}
