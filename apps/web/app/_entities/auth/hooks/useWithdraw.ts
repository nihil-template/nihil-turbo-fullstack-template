import { authKeys } from '@/_entities/auth/auth.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';

interface UseWithdrawOptions extends MutationOptionsType<null, void> {}

/**
 * 회원탈퇴를 위한 커스텀 훅
 *
 * @param options - 뮤테이션 옵션 (선택사항)
 * @returns 회원탈퇴 뮤테이션 객체
 *
 * @example
 * ```typescript
 * const withdraw = useWithdraw({
 *   onSuccess: () => {
 *     console.log('회원탈퇴 성공');
 *   },
 *   onError: (error) => {
 *     console.error('회원탈퇴 실패:', error);
 *   }
 * });
 *
 * const handleWithdraw = async () => {
 *   try {
 *     await withdraw.mutateAsync();
 *     // 회원탈퇴 성공 처리
 *   } catch (error) {
 *     // 에러 처리
 *   }
 * };
 * ```
 */
export function useWithdraw(options: UseWithdrawOptions = {}) {
  const query = usePost<null, void>({
    url: [ 'auth', 'withdraw', ],
    key: authKeys.withdraw(),
    options,
  });

  return query;
}
