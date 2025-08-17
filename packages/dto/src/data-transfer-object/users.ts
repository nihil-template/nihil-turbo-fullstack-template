import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';

import {
  UpdateProfileSchema,
  GetUsersQuerySchema,
  GetUsersResponseType,
} from '../form-model/users.form-model';

// 프로필 업데이트 DTO
export class UpdateProfileDto extends createZodDto(UpdateProfileSchema) {
  @ApiProperty({
    description: '사용자 이름 (2자 이상)',
    example: '홍길동',
  })
  declare userNm: string;
}

// 사용자 목록 조회 쿼리 DTO
export class GetUsersQueryDto extends createZodDto(GetUsersQuerySchema) {
  @ApiProperty({
    description: '페이지 번호',
    example: 1,
  })
  declare page: number;

  @ApiProperty({
    description: '페이지당 항목 수',
    example: 10,
  })
  declare limit: number;
}

// 사용자 목록 응답 DTO
export type GetUsersResponseDto = GetUsersResponseType;
