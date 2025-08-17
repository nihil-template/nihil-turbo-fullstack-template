import type { UserInfo } from '@repo/prisma';

import { authKeys } from '@/_entities/auth/auth.keys';
import type { SignUpData } from '@/_entities/auth/auth.types';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';

interface UseSignUpOptions extends MutationOptionsType<UserInfo, SignUpData> {}

export function useSignUp(options: UseSignUpOptions = {}) {
  const query = usePost<UserInfo, SignUpData>({
    url: [ 'auth', 'signup', ],
    key: authKeys.signup(),
    options,
  });

  return {
    ...query,
    userInfo: query.data,
  };
}
