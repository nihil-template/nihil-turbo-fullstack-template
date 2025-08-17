export const auth = {
  invalidCredentials: '이메일 또는 비밀번호를 확인해주세요.',
  conflictEmail: '이미 가입된 이메일입니다.',
  resetTokenAndPasswordRequired: '리셋 토큰과 새 비밀번호가 필요합니다.',
  invalidToken: '유효하지 않은 토큰입니다.',
  invalidOrExpiredResetToken: '유효하지 않거나 만료된 리셋 토큰입니다.',
  resetPasswordEmailSubject: (title: string): string =>
    `[${title}]  비밀번호 재설정 안내`,
  resetPasswordEmailText: (resetLink: string): string =>
    `비밀번호를 재설정하려면 다음 링크를 클릭해주세요: ${resetLink}\n이 링크는 5분간 유효합니다.`,
  refreshTokenNotFound: '리프레시 토큰을 찾을 수 없습니다.',
  invalidRefreshToken: '유효하지 않은 리프레시 토큰입니다.',
} as const;
