/**
 * 웹사이트 환경설정 예시 파일입니다.
 * 실제 서비스에 맞게 값을 수정하여 사용하세요.
 */
export const webConfig = {
  // 사이트 제목 (예: '마스터의 블로그')
  "title": "예시 블로그",

  // 사이트 설명 (예: '개발과 일상에 대한 이야기')
  "description": "이곳은 예시용 기술 블로그 설명입니다.",

  // 검색엔진 최적화(SEO)를 위한 키워드 (쉼표로 구분)
  "keywords": "예시, 샘플, 블로그, 웹, 개발",

  // 작성자 정보
  "author": {
    // 작성자 이름 (예: 'Master')
    "name": "ExampleUser",
    // 작성자 URL 또는 프로필 링크 (예: 'https://github.com/master')
    "url": "https://github.com/example"
  },

  // 사이트 타입 (기본값: 'website')
  "type": "website",

  // 사이트 기본 URL (개발/운영 환경에 따라 자동 분기)
  "url": process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://example.com',

  // 오픈그래프/공유용 대표 이미지
  "cover": {
    // 이미지 경로 또는 URL (예: '/opengraph-image.png')
    "link": "/example-opengraph-image.png",
    // 이미지 대체 텍스트
    "alt": "example.com site image"
  },

  // 기본 로고 이미지 경로
  "logo": "/images/example-logo.png",

  // 다크모드용 로고 이미지 경로
  "darkLogo": "/images/example-logo-dark.png",

  // 사이트 버전 (예: '1.0.0')
  "version": "0.0.1",

  // 구글 사이트 인증 코드 (Search Console 등)
  "googleVerfi": "예시-구글-사이트-인증값",

  // 구글 애드센스 광고 스크립트 소스
  "googleAdSrc": "예시-구글-광고-스크립트",

  // 구글 애널리틱스 ID (예: 'G-XXXXXXXXXX')
  "googleAnalyticsId": "G-EXAMPLE1234",

  // API 서버 주소 (개발 환경에 맞게 수정)
  "apiRoute": "http://localhost:8000"
}