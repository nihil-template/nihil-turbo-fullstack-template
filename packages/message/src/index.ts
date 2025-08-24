import { common } from './common';
import { auth } from './auth';
import { user } from './user';
import { profile } from './profile';

export const messages = {
  common,
  auth,
  user,
  profile,
} as const;

// 개별 export
export { common, auth, user, profile };

// 타입 export
export type {
  CommonMessages,
  AuthMessages,
  UserMessages,
  ProfileMessages,
  AllMessages,
} from './types';

// 기본 export
export default messages; 