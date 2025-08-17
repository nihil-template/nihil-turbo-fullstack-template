import { UserRole } from '@repo/prisma';
import { z } from 'zod';

const emailSchema = z.email('올바른 이메일 형식을 입력해주세요.');

const passwordSchema = z
  .string()
  .min(10, '비밀번호는 10자 이상이어야 합니다.')
  .max(40, '비밀번호는 40자 이하이어야 합니다.')
  .regex(/[a-z]/, '비밀번호는 영문 소문자를 포함해야 합니다.')
  .regex(/[A-Z]/, '비밀번호는 영문 대문자를 포함해야 합니다.')
  .regex(/[0-9]/, '비밀번호는 숫자를 포함해야 합니다.')
  .regex(/[^a-zA-Z0-9]/, '비밀번호는 특수문자를 포함해야 합니다.');

// 회원가입 스키마 (폼용 - passwordConfirm 포함)
export const SignUpSchema = z.object({
  emlAddr: emailSchema,
  userNm: z.string().min(2, '사용자명은 2자 이상이어야 합니다.'),
  userRole: z.enum([UserRole.USER, UserRole.ADMIN]),
  password: passwordSchema,
  passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
}).refine((data) => data.password === data.passwordConfirm, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['passwordConfirm'],
});

export type SignUpType = z.infer<typeof SignUpSchema>;

// 로그인 스키마
export const SignInSchema = z.object({
  emlAddr: emailSchema,
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});
export type SignInType = z.infer<typeof SignInSchema>;

// 비밀번호 찾기 스키마
export const ForgotPasswordSchema = z.object({
  emlAddr: emailSchema,
});
export type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;

// 새 비밀번호 설정 스키마 (백엔드 기준)
export const NewPasswordSchema = z.object({
  resetToken: z.string().min(1, '리셋 토큰을 입력해주세요.'),
  newPassword: passwordSchema,
});
export type NewPasswordType = z.infer<typeof NewPasswordSchema>;

// 비밀번호 변경 스키마
export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, '현재 비밀번호를 입력해주세요.'),
  newPassword: passwordSchema,
});
export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;
