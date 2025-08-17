import { useGet } from '@/_entities/common/hooks';
import { usersKeys } from '@/_entities/users/users.keys';
import type { GetUsersParams, GetUsersResponse } from '@/_entities/users/users.types';

/**
 * 사용자 목록을 가져오는 훅 (페이지네이션 포함)
 * @param params - 페이지, 개수 등 파라미터
 */
export function useGetUsers(params: GetUsersParams) {
  const {
    data,
    ...query
  } = useGet<GetUsersResponse>({
    url: [ 'users', ],
    key: usersKeys.users(params),
    params,
  });

  return {
    users: data?.users,
    total: data?.total,
    ...query,
  };
}
