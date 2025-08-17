import { authKeys } from '@/_entities/auth/auth.keys';
import type { ForgotPasswordData } from '@/_entities/auth/auth.types';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';

interface UseForgotPasswordOptions extends MutationOptionsType<null, ForgotPasswordData> {}

/**
 * 비밀번호 재설정 요청을 위한 커스텀 훅
 * 임시 비밀번호를 이메일로 발급합니다.
 *
 * @param options - 뮤테이션 옵션 (선택사항)
 * @returns 비밀번호 재설정 요청 뮤테이션 객체
 *
 * @example
 * ```typescript
 * const forgotPassword = useForgotPassword({
 *   onSuccess: (data) => {
 *     console.log('비밀번호 재설정 요청 성공');
 *   },
 *   onError: (error) => {
 *     console.error('비밀번호 재설정 요청 실패:', error);
 *   }
 * });
 *
 * const handleForgotPassword = async (email: string) => {
 *   try {
 *     await forgotPassword.mutateAsync({ emlAddr: email });
 *     // 임시 비밀번호 발급 성공 처리
 *   } catch (error) {
 *     // 에러 처리
 *   }
 * };
 * ```
 */
export function useForgotPassword(options: UseForgotPasswordOptions = {}) {
  const query = usePost<null, ForgotPasswordData>({
    url: [ 'auth', 'forgot-password', ],
    key: authKeys.forgotPassword(),
    options,
  });

  return query;
}
