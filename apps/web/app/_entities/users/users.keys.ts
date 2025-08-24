import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { GetUsersParams } from './users.types';

/**
 * 사용자 관련 쿼리 키 정의
 */
export const usersKeys = createQueryKeys('users', {
  // ===== GET Queries =====
  profile: () => [ 'profile', ], // 내 정보 조회
  users: (params: GetUsersParams) => [ 'users', params, ], // 사용자 목록 조회
  user: (userId: string) => [ 'user', userId, ], // 특정 사용자 조회
  userByEmail: (emlAddr: string) => [ 'userByEmail', emlAddr, ], // 이메일로 사용자 조회

  // ===== PUT Mutations =====
  updateProfile: () => [ 'updateProfile', ], // 내 정보 수정
});
