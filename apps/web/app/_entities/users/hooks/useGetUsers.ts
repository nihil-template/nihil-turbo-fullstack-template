import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { usersKeys } from '@/_entities/users/users.keys';
import type { GetUsersResponse } from '@/_entities/users/users.types';
import type { GetUsersParams } from '@/_entities/users/users.types';

interface UseGetUsersOptions extends QueryOptionType<GetUsersResponse> {}

/**
 * 사용자 목록을 가져오는 훅 (페이지네이션 포함)
 *
 * @param params - 페이지, 개수 등 파라미터
 * @param options - 쿼리 옵션 (선택사항)
 * @returns 사용자 목록 조회 결과
 *
 * @example
 * ```typescript
 * const { users, total, loading, done } = useGetUsers(
 *   { page: 1, limit: 10 },
 *   {
 *     staleTime: 5 * 60 * 1000,
 *     onSuccess: (data) => {
 *       console.log('사용자 목록 로드 완료:', data);
 *     }
 *   }
 * );
 * ```
 */
export function useGetUsers(
  params: GetUsersParams,
  options?: UseGetUsersOptions
) {
  const {
    data,
    ...query
  } = useGet<GetUsersResponse>({
    url: [ 'users', ],
    key: usersKeys.users(params),
    params,
    options,
  });

  return {
    users: data?.users,
    total: data?.total,
    ...query,
  };
}
