import type { UserInfo } from '@repo/prisma';

import { authKeys } from '@/_entities/auth/auth.keys';
import type { SignInData } from '@/_entities/auth/auth.types';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';

interface UseSignInOptions extends MutationOptionsType<UserInfo, SignInData> {}

export function useSignIn(options: UseSignInOptions = {}) {
  const query = usePost<UserInfo, SignInData>({
    url: [ 'auth', 'signin', ],
    key: authKeys.signin(),
    options,
  });

  return {
    ...query,
    session: query.data,
  };
}
