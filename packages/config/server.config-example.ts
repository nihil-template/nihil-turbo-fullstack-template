/**
 * 서버 환경설정 예시 파일입니다.
 * 실제 서비스 환경에 맞게 값을 수정하여 사용하세요.
 */
export const serverConfig = {
  // 서버가 사용할 포트 번호 (예: 8000)
  port: 1234,

  // 서버 호스트명 (예: 'localhost' 또는 '0.0.0.0')
  host: 'example-host',

  // JWT 설정
  jwt: {
    access: {
      // 액세스 토큰 시크릿 키 (예시: 임의의 긴 문자열)
      secret: 'your-access-token-secret-here',
      // 액세스 토큰 만료 시간 (예시: '1h', '15m' 등)
      expiresIn: '1h',
    },
    refresh: {
      // 리프레시 토큰 시크릿 키 (예시: 임의의 긴 문자열)
      secret: 'your-refresh-token-secret-here',
      // 리프레시 토큰 만료 시간 (예시: '30d', '7d' 등)
      expiresIn: '30d',
    },
  },

  // Nodemailer 설정
  nodemailer: {
    // 메일 서버 호스트명 (예: 'smtp.naver.com')
    host: 'example-host',

    // 메일 서버 포트 번호 (예: 587)
    port: 1234,

    // 메일 서버 보안 설정 (예: true 또는 false)
    secure: false,

    // 메일 서버 인증 정보
    auth: {
      // 메일 서버 사용자 이메일 (예: 'nihil_ncunia@naver.com')
      user: 'example-email@example.com',

      // 메일 서버 비밀번호 (예: 'example-password')
      pass: 'example-password',
    },
  }
};