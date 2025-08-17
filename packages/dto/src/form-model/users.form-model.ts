import type { UserInfo } from '@repo/prisma';
import { z } from 'zod';

// 프로필 업데이트 스키마
export const UpdateProfileSchema = z.object({
  userNm: z.string().min(2, '사용자명은 2자 이상이어야 합니다.'),
});
export type UpdateProfileType = z.infer<typeof UpdateProfileSchema>;

// 사용자 목록 조회 쿼리 스키마
export const GetUsersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional().default(10),
});
export type GetUsersQueryType = z.infer<typeof GetUsersQuerySchema>;

// 사용자 목록 응답 타입
export interface GetUsersResponseType {
  users: UserInfo[];
  total: number;
}
