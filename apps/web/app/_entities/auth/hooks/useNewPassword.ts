import { authKeys } from '@/_entities/auth/auth.keys';
import type { NewPasswordData } from '@/_entities/auth/auth.types';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';

interface UseNewPasswordOptions extends MutationOptionsType<null, NewPasswordData> {}

/**
 * 새 비밀번호 설정을 위한 커스텀 훅
 * 리셋 토큰을 사용하여 새 비밀번호를 설정합니다.
 *
 * @param options - 뮤테이션 옵션 (선택사항)
 * @returns 새 비밀번호 설정 뮤테이션 객체
 *
 * @example
 * ```typescript
 * const newPassword = useNewPassword({
 *   onSuccess: () => {
 *     console.log('새 비밀번호 설정 성공');
 *   },
 *   onError: (error) => {
 *     console.error('새 비밀번호 설정 실패:', error);
 *   }
 * });
 *
 * const handleNewPassword = async (resetToken: string, newPassword: string) => {
 *   try {
 *     await newPassword.mutateAsync({
 *       resetToken,
 *       newPassword,
 *     });
 *     // 새 비밀번호 설정 성공 처리
 *   } catch (error) {
 *     // 에러 처리
 *   }
 * };
 * ```
 */
export function useNewPassword(options: UseNewPasswordOptions = {}) {
  const query = usePost<null, NewPasswordData>({
    url: [ 'auth', 'new-password', ],
    key: authKeys.newPassword(),
    options,
  });

  return query;
}
