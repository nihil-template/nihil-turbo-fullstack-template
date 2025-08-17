import type {
  UpdateProfileType,
  GetUsersQueryType,
  GetUsersResponseType
} from '@repo/dto/formModel';

// 프로필 수정 요청 데이터
export type UpdateProfileData = UpdateProfileType;

// 사용자 목록 조회 요청 파라미터
export type GetUsersParams = GetUsersQueryType;

// 사용자 목록 조회 응답 데이터
export type GetUsersResponse = GetUsersResponseType;
