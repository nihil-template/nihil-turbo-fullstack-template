import type { AuthMessages } from './types';

export const auth: AuthMessages = {
  // 성공 메시지
  signUpSuccess: '회원가입이 완료되었습니다.',
  signUpError: '회원가입 중 오류가 발생했습니다.',
  signInSuccess: '로그인되었습니다.',
  signInError: '로그인 중 오류가 발생했습니다.',
  signOutSuccess: '로그아웃되었습니다.',
  signOutError: '로그아웃 중 오류가 발생했습니다.',
  forgotPasswordSuccess: '비밀번호 재설정 링크가 이메일로 전송되었습니다.',
  forgotPasswordError: '비밀번호 재설정 요청 중 오류가 발생했습니다.',
  passwordChangeSuccess: '비밀번호가 변경되었습니다.',
  passwordChangeError: '비밀번호 변경 중 오류가 발생했습니다.',
  signedOut: '로그아웃되었습니다.',
  withdrawn: '회원탈퇴가 완료되었습니다.',
  passwordChanged: '비밀번호가 성공적으로 변경되었습니다.',
  forgotPasswordEmailSent: '비밀번호 재설정 이메일을 발송했습니다. 5분 안에 확인해주세요.',
  newPasswordSet: '새 비밀번호가 성공적으로 설정되었습니다.',

  // 에러 메시지
  emailInUse: '이미 등록된 이메일입니다.',
  invalidCredentials: '이메일 또는 비밀번호가 올바르지 않습니다.',
  sessionExpired: '세션이 만료되었습니다. 다시 로그인해주세요.',
  alreadyExists: '이미 존재하는 계정입니다.',
  notFound: '계정을 찾을 수 없습니다.',
  deleted: '계정이 삭제되었습니다.',
  invalidInput: '이메일, 사용자명, 비밀번호는 필수 입력 항목입니다.',
  conflictEmail: '이미 가입된 이메일입니다.',
  resetTokenAndPasswordRequired: '리셋 토큰과 새 비밀번호가 필요합니다.',
  invalidToken: '유효하지 않은 토큰입니다.',
  invalidOrExpiredResetToken: '유효하지 않거나 만료된 리셋 토큰입니다.',
  refreshTokenNotFound: '리프레시 토큰을 찾을 수 없습니다.',
  invalidRefreshToken: '유효하지 않은 리프레시 토큰입니다.',

  // 이메일 관련 함수
  resetPasswordEmailSubject: (title: string): string =>
    `[${title}]  비밀번호 재설정 안내`,
  resetPasswordEmailText: (resetLink: string): string =>
    `비밀번호를 재설정하려면 다음 링크를 클릭해주세요: ${resetLink}\n이 링크는 5분간 유효합니다.`,
  resetPasswordEmailHtml: (title: string, resetLink: string): string =>
    `<!doctype html>
    <html lang="ko">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>[${title}] 비밀번호 재설정 안내</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', Arial, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; background:#f7f7f8; margin:0; padding:24px; }
          .card { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 28px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
          h1 { font-size: 18px; margin: 0 0 12px; }
          p { color:#2f2f33; line-height:1.6; margin: 0 0 12px; }
          .btn { display:inline-block; background:#111827; color:#ffffff !important; text-decoration:none; padding:12px 16px; border-radius:8px; font-weight:600; }
          .link { word-break: break-all; color:#2563eb; }
          .muted { color:#6b7280; font-size:12px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>비밀번호 재설정 안내</h1>
          <p>아래 버튼을 눌러 비밀번호를 재설정하세요.</p>
          <p style="margin:16px 0;"><a class="btn" href="${resetLink}" target="_blank" rel="noopener">비밀번호 재설정</a></p>
          <p class="muted">또는 다음 링크를 복사해 브라우저에 붙여넣기:</p>
          <p class="link">${resetLink}</p>
          <p class="muted">이 링크는 5분간 유효합니다.</p>
        </div>
      </body>
    </html>`
}; 