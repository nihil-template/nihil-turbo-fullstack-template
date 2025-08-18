import { createZodDto } from 'nestjs-zod';
import { UserRole } from '@repo/prisma';
import { ApiProperty } from '@nestjs/swagger';

import {
  SignUpSchema,
  SignInSchema,
  ForgotPasswordSchema,
  NewPasswordSchema,
  ChangePasswordSchema,
  WithdrawSchema,
} from '../form-model/auth.form-model';

// 회원가입 DTO용 스키마 (passwordConfirm 제외)
const SignUpDtoSchema = SignUpSchema.omit({ passwordConfirm: true });

// 회원가입 DTO
export class SignUpDto extends createZodDto(SignUpDtoSchema) {
  @ApiProperty({
    description: '사용자 이메일 주소',
    example: 'user@example.com',
  })
  declare emlAddr: string;

  @ApiProperty({
    description: '사용자 이름 (2자 이상)',
    example: '홍길동',
  })
  declare userNm: string;

  @ApiProperty({
    description: '사용자 역할',
    example: 'USER',
  })
  declare userRole: UserRole;

  @ApiProperty({
    description: '사용자 비밀번호 (10자 이상, 영문 대소문자, 숫자, 특수문자 포함)',
    example: 'Password123!',
  })
  declare password: string;
}

// 로그인 DTO
export class SignInDto extends createZodDto(SignInSchema) {
  @ApiProperty({
    description: '사용자 이메일 주소',
    example: 'user@example.com',
  })
  declare emlAddr: string;

  @ApiProperty({
    description: '사용자 비밀번호',
    example: 'Password123!',
  })
  declare password: string;
}

// 비밀번호 찾기 DTO
export class ForgotPasswordDto extends createZodDto(ForgotPasswordSchema) {
  @ApiProperty({
    description: '사용자 이메일 주소',
    example: 'user@example.com',
  })
  declare emlAddr: string;
}

// 새 비밀번호 설정 DTO (백엔드 기준)
export class NewPasswordDto extends createZodDto(NewPasswordSchema) {
  @ApiProperty({
    description: '리셋 토큰',
    example: 'reset-token-123456',
  })
  declare resetToken: string;

  @ApiProperty({
    description: '새 비밀번호 (10자 이상, 영문 대소문자, 숫자, 특수문자 포함)',
    example: 'NewPassword123!',
  })
  declare newPassword: string;
}

// 비밀번호 변경 DTO
export class ChangePasswordDto extends createZodDto(ChangePasswordSchema) {
  @ApiProperty({
    description: '현재 비밀번호',
    example: 'CurrentPassword123!',
  })
  declare currentPassword: string;

  @ApiProperty({
    description: '새 비밀번호 (10자 이상, 영문 대소문자, 숫자, 특수문자 포함)',
    example: 'NewPassword123!',
  })
  declare newPassword: string;
}

// 회원 탈퇴 DTO
export class WithdrawDto extends createZodDto(WithdrawSchema) {
  @ApiProperty({
    description: '현재 비밀번호',
    example: 'CurrentPassword123!',
  })
  declare password: string;
}
