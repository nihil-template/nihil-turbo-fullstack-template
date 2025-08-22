import type { UserInfo } from '@repo/prisma';
import { z } from 'zod';

// 프로필 업데이트 스키마 (백엔드용)
export const UpdateProfileSchema = z.object({
  userNm: z.string()
    .min(1, '사용자명은 필수 입력 항목입니다.')
    .min(2, '사용자명은 2자 이상이어야 합니다.')
    .max(50, '사용자명은 50자를 초과할 수 없습니다.')
    .describe('사용자 이름 (2자 이상)'),
});
export type UpdateProfileType = z.infer<typeof UpdateProfileSchema>;

// 프로필 수정 스키마 (폼용 - emlAddr 포함)
export const UpdateProfileFormSchema = z.object({
  userNm: z.string()
    .min(1, '사용자명은 필수 입력 항목입니다.')
    .min(2, '사용자명은 2자 이상이어야 합니다.')
    .max(50, '사용자명은 50자를 초과할 수 없습니다.'),
  emlAddr: z.string().email('올바른 이메일 주소를 입력해주세요'),
});
export type UpdateProfileFormType = z.infer<typeof UpdateProfileFormSchema>;

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
