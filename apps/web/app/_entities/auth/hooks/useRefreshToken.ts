import type { UserInfo } from '@repo/prisma';

import type { MutationOptionType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';
import { authKeys } from '@/_entities/auth/auth.keys';

interface UseRefreshTokenOptions extends MutationOptionType<UserInfo, null> {}

/**
 * 토큰 갱신 hook
 *
 * @param options - 뮤테이션 옵션 (선택사항)
 * @returns 토큰 갱신 뮤테이션 객체
 *
 * @example
 * ```typescript
 * const { mutate: refreshToken, isPending } = useRefreshToken({
 *   onSuccess: (user) => {
 *     console.log('토큰 갱신 성공:', user);
 *   },
 *   onError: (error) => {
 *     console.error('토큰 갱신 실패:', error);
 *   }
 * });
 * 
 * // 사용
 * refreshToken(null);
 * ```
 */
export function useRefreshToken(options?: UseRefreshTokenOptions) {
  return usePost<UserInfo, null>({
    url: [ 'auth', 'refresh', ],
    key: authKeys.refresh(),
    options,
  });
}