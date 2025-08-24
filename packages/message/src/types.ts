// 공통 메시지 타입
export interface CommonMessages {
  success: string;
  error: string;
  unauthorized: string;
  forbidden: string;
  notFound: string;
  invalidRequest: string;
  alreadyExists: string;
  deleted: string;
  internalServerError: string;
}

// 인증 관련 메시지 타입
export interface AuthMessages {
  // 성공 메시지
  signUpSuccess: string;
  signUpError: string;
  signInSuccess: string;
  signInError: string;
  signOutSuccess: string;
  signOutError: string;
  forgotPasswordSuccess: string;
  forgotPasswordError: string;
  passwordChangeSuccess: string;
  passwordChangeError: string;
  signedOut: string;
  withdrawn: string;
  passwordChanged: string;
  forgotPasswordEmailSent: string;
  newPasswordSet: string;

  // 에러 메시지
  emailInUse: string;
  invalidCredentials: string;
  sessionExpired: string;
  alreadyExists: string;
  notFound: string;
  deleted: string;
  invalidInput: string;
  conflictEmail: string;
  resetTokenAndPasswordRequired: string;
  invalidToken: string;
  invalidOrExpiredResetToken: string;
  refreshTokenNotFound: string;
  invalidRefreshToken: string;

  // 이메일 관련 함수
  resetPasswordEmailSubject: (title: string) => string;
  resetPasswordEmailText: (resetLink: string) => string;
  resetPasswordEmailHtml: (title: string, resetLink: string) => string;
}

// 사용자 관련 메시지 타입
export interface UserMessages {
  // 성공 메시지
  createSuccess: string;
  createError: string;
  updateSuccess: string;
  updateError: string;
  passwordChangeSuccess: string;
  passwordChangeError: string;
  imageChangeSuccess: string;
  imageChangeError: string;
  listSuccess: string;
  listError: string;
  fetchSuccess: string;
  fetchError: string;
  deleteSuccess: string;
  deleteError: string;
  profileUpdated: string;

  // 에러 메시지
  emailExists: string;
  nameExists: string;
  notFound: string;
  userNotFound: string;
  profileUpdateFailed: string;
  profileValidationFailed: string;
  profileDataRequired: string;
  profileEmailInvalid: string;
  profileNameRequired: string;
  profileNameTooLong: string;
  profileBioTooLong: string;
  profileImageInvalid: string;
}

// 프로필 관련 메시지 타입
export interface ProfileMessages {
  // 조회 관련
  getSuccess: string;
  getError: string;
  getByEmailSuccess: string;
  getByEmailError: string;
  listSuccess: string;
  listError: string;
  notFound: string;

  // 생성/수정 관련
  createSuccess: string;
  createError: string;
  updateSuccess: string;
  updateError: string;

  // 삭제 관련
  deleteSuccess: string;
  deleteError: string;
  deleteMultipleSuccess: string;
  deleteMultipleError: string;

  // 중복 체크 관련
  emailExists: string;
  usernameExists: string;

  // 비밀번호 관련
  passwordChangeSuccess: string;
  passwordChangeError: string;
  invalidPassword: string;

  // 이미지 관련
  imageChangeSuccess: string;
  imageChangeError: string;
}

// 전체 메시지 타입
export interface AllMessages {
  common: CommonMessages;
  auth: AuthMessages;
  user: UserMessages;
  profile: ProfileMessages;
} 