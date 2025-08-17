import { authKeys } from '@/_entities/auth/auth.keys';
import type { SignOutData } from '@/_entities/auth/auth.types';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';

interface UseSignOutOptions extends MutationOptionsType<null, SignOutData> {}

export function useSignOut(options: UseSignOutOptions = {}) {
  const query = usePost<null, SignOutData>({
    url: [ 'auth', 'signout', ],
    key: authKeys.signout(),
    options,
  });

  return query;
}
