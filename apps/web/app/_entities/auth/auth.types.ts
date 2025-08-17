import type {
  SignUpType,
  SignInType,
  ChangePasswordType,
  ForgotPasswordType,
  NewPasswordType
} from '@repo/dto/formModel';

// 회원가입 요청 데이터
export type SignUpData = SignUpType;

// 로그인 요청 데이터
export type SignInData = SignInType;

// 로그아웃 요청 데이터
export type SignOutData = null;

// 회원탈퇴 요청 데이터
export type WithdrawData = null;

// 비밀번호 재설정 요청 데이터
export type ForgotPasswordData = ForgotPasswordType;

// 새 비밀번호 설정 요청 데이터 (백엔드 기준)
export type NewPasswordData = NewPasswordType;

// 비밀번호 변경 요청 데이터
export type ChangePasswordData = ChangePasswordType;
