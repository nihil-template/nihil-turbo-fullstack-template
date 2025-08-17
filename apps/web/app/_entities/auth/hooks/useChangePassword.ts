import { authKeys } from '@/_entities/auth/auth.keys';
import type { ChangePasswordData } from '@/_entities/auth/auth.types';
import { usePost } from '@/_entities/common/hooks';

/**
 * 로그인된 사용자의 비밀번호 변경을 위한 커스텀 훅
 *
 * @returns 비밀번호 변경 뮤테이션 객체
 *
 * @example
 * ```typescript
 * const changePassword = useChangePassword();
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
export function useChangePassword() {
  const query = usePost<null, ChangePasswordData>({
    url: [ 'auth', 'change-password', ],
    key: authKeys.changePassword(),
  });

  return query;
}
