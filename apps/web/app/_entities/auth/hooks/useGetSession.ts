import { UserInfo } from '@repo/prisma';

import { authKeys } from '@/_entities/auth/auth.keys';
import { useGet } from '@/_entities/common/hooks';

export function useGetSession() {
  const {
    data: session,
    ...query
  } = useGet<UserInfo>({
    url: [ 'auth', 'session', ],
    key: authKeys.session(),
  });

  return {
    session,
    ...query,
  };
}
