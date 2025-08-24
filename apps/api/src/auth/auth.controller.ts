import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  Req,
  Get,
  Delete
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import type { Request, Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiOkResponse
} from '@nestjs/swagger';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  NewPasswordDto,
  SignInDto,
  SignUpDto
} from '@repo/dto/DTO';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtPayload } from './jwt.strategy';
import { UnauthorizedException } from '@nestjs/common';
import { auth } from '@repo/message';

const exampleUser = {
  userId: 'clv23b1g2000008l8g8h8g8h8',
  emlAddr: 'user@example.com',
  userNm: '홍길동',
  userRole: 'USER',
  proflImg: null,
  userBiogp: '안녕하세요. 반갑습니다.',
  actvtnYn: true,
  lastLgnDt: '2025-08-24T10:00:00.000Z',
  crtDt: '2025-08-24T09:00:00.000Z',
  updtDt: '2025-08-24T10:00:00.000Z',
  delDt: null,
};

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * 회원가입
   * @param signUpData 회원가입 데이터
   * @returns 회원가입 결과
   */
  @ApiOperation({
    summary: '📝 회원가입',
    description: [
      '새로운 사용자 계정을 생성합니다.',
      '',
      '**입력 요구사항:**',
      '- 이메일: 유효한 이메일 형식',
      '- 비밀번호: 10자 이상, 영문 대/소문자, 숫자, 특수문자 포함',
      '- 사용자명: 2자 이상',
      '- 역할: USER 또는 ADMIN',
      '',
      '**자동 처리:**',
      '- 비밀번호 자동 암호화 (bcrypt)',
      '- 이메일 중복 검사',
      '- 사용자 활성화 상태 자동 설정',
    ].join('\n'),
  })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
    schema: {
      example: {
        status: 201,
        message: '회원가입이 성공적으로 완료되었습니다.',
        data: exampleUser,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 데이터',
    schema: {
      example: { status: 400, message: 'passwordConfirm: 비밀번호가 일치하지 않습니다.', },
    },
  })
  @ApiResponse({
    status: 409,
    description: '이미 존재하는 이메일',
    schema: {
      example: { status: 409, message: auth.conflictEmail, },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(@Body() signUpData: SignUpDto) {
    return this.authService.signUp(signUpData);
  }

  /**
   * 로그인
   * @param signInData 로그인 데이터
   * @param res 응답 객체
   * @returns 로그인 결과
   */
  @ApiOperation({
    summary: '🔐 사용자 로그인',
    description: [
      '사용자 인증을 처리하고 JWT 토큰을 발급합니다.',
      '',
      '**자동 인증 기능:**',
      '- 로그인 성공 시 HTTP-Only 쿠키에 accessToken과 refreshToken이 자동 설정됩니다',
      '- Swagger UI에서 테스트 시 토큰이 자동으로 Authorization 헤더에 설정됩니다',
      '- 이후 모든 API 요청에서 별도 설정 없이 자동 인증됩니다',
      '',
      '**보안 기능:**',
      '- 비밀번호 암호화 (bcrypt)',
      '- 토큰 자동 만료 (Access: 1시간, Refresh: 30일)',
      '- 속도 제한 (분당 5회)',
    ].join('\n'),
  })
  @ApiOkResponse({
    description: '로그인 성공',
    schema: {
      example: {
        status: 200,
        message: '로그인에 성공했습니다.',
        data: {
          ...exampleUser,
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
    schema: {
      example: { status: 401, message: auth.invalidCredentials, },
    },
  })
  @Throttle({ default: { limit: 5, ttl: 60000, }, })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(
    @Body() signInData: SignInDto,
    @Res({ passthrough: true, }) res: Response,
    @Req() req: Request
  ) {
    const { user, acsToken, reshToken, }
      = await this.authService.signIn(signInData);

    res.cookie('accessToken', acsToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000, // 1시간
    });

    res.cookie('refreshToken', reshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30일
    });

    // Swagger에서 테스트를 위한 로그인 요청인 경우 토큰을 응답에 포함
    if (req.headers[ 'x-swagger-login' ] === 'true') {
      return {
        ...user,
        accessToken: acsToken,
      };
    }

    return user;
  }

  /**
   * 토큰 재발급
   * @param req 요청 객체
   * @param res 응답 객체
   * @returns 재발급 결과
   */
  @ApiOperation({
    summary: '🔄 자동 토큰 갱신',
    description: [
      '리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급합니다.',
      '',
      '**Refresh Token Rotation:**',
      '- 기존 Refresh Token을 새로운 것으로 교체',
      '- Access Token 또한 새로 발급',
      '- 보안성 향상을 위한 토큰 순환',
      '',
      '**자동 처리:**',
      '- 액세스 토큰 만료 시 axios 인터셉터에서 자동 호출',
    ].join('\n'),
  })
  @ApiOkResponse({
    description: '토큰 재발급 성공',
    schema: {
      example: {
        status: 200,
        message: '토큰이 성공적으로 갱신되었습니다.',
        data: exampleUser,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: '리프레시 토큰이 유효하지 않음',
    schema: {
      example: { status: 401, message: auth.invalidRefreshToken, },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true, }) res: Response
  ) {
    const refreshToken = req.cookies[ 'refreshToken' ] as string;

    if (!refreshToken) {
      throw new UnauthorizedException(auth.refreshTokenNotFound);
    }

    const { user, acsToken, reshToken, } = await this.authService.refresh(refreshToken);

    res.cookie('accessToken', acsToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000, // 1시간
    });

    res.cookie('refreshToken', reshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30일
    });

    return user;
  }

  /**
   * 로그아웃
   * @param res 응답 객체
   * @returns 로그아웃 결과
   */
  @ApiOperation({
    summary: '🚪 로그아웃',
    description: [
      '사용자 로그아웃을 처리하고 모든 인증 정보를 제거합니다.',
      '',
      '**보안 처리:**',
      '- HTTP-Only 쿠키에서 토큰 제거',
      '- 데이터베이스에서 Refresh Token 삭제',
      '- 서버 측 세션 무효화',
      '',
      '**클라이언트 연동:**',
      '- 로그아웃 후 로그인 페이지로 리다이렉트',
    ].join('\n'),
  })
  @ApiOkResponse({
    description: '로그아웃 성공',
    schema: {
      example: { status: 200, message: auth.signedOut, data: null, },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  signOut(@Res({ passthrough: true, }) res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return { message: auth.signedOut, data: null, };
  }

  /**
   * 세션 조회
   * @param req 요청 객체
   * @returns 현재 사용자 정보
   */
  @ApiOperation({
    summary: '🔐 현재 세션 정보',
    description: [
      '현재 로그인된 사용자의 세션 정보를 조회합니다.',
      '',
      '**사용 예시:**',
      '- 앱 시작 시 로그인 상태 확인',
      '- 헤더에 사용자 정보 표시',
      '- 인증이 필요한 페이지 접근 전 검증',
      '',
      '**자동 인증:**',
      '- 쿠키의 JWT 토큰으로 자동 인증',
    ].join('\n'),
  })
  @ApiOkResponse({
    description: '세션 조회 성공',
    schema: {
      example: {
        status: 200,
        message: '세션 정보를 성공적으로 조회했습니다.',
        data: exampleUser,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 요청',
    schema: {
      example: { status: 401, message: 'Unauthorized', },
    },
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('session')
  async getSession(@Req() req: Request & { user: JwtPayload }) {
    const authUser = req.user;
    return this.authService.session(authUser.userId);
  }

  /**
   * 회원탈퇴
   * @param req 요청 객체
   * @param res 응답 객체
   * @returns 회원탈퇴 결과
   */
  @ApiOperation({
    summary: '⚠️ 회원탈퇴',
    description: [
      '현재 로그인된 사용자의 계정을 영구적으로 삭제합니다.',
      '',
      '**중요 주의사항:**',
      '- 계정 삭제는 되돌릴 수 없습니다',
      '- 모든 사용자 데이터가 완전히 삭제됩니다',
      '- 삭제 후 동일한 이메일로 재가입 가능',
      '',
      '**처리 과정:**',
      '- 즉시 로그아웃 처리',
      '- 모든 토큰 무효화',
      '- 사용자 데이터 완전 삭제',
    ].join('\n'),
  })
  @ApiOkResponse({
    description: '회원탈퇴 성공',
    schema: {
      example: { status: 200, message: auth.withdrawn, data: null, },
    },
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 요청',
    schema: {
      example: { status: 401, message: 'Unauthorized', },
    },
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Delete('withdraw')
  async withdraw(@Req() req: Request, @Res({ passthrough: true, }) res: Response) {
    const user = req.user as JwtPayload;
    await this.authService.withdraw(user.userId);

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return { message: auth.withdrawn, data: null, };
  }

  /**
   * 비밀번호 변경
   * @param req 요청 객체
   * @param changePasswordData 비밀번호 변경 데이터
   * @returns 비밀번호 변경 결과
   */
  @ApiOperation({
    summary: '🔒 비밀번호 변경',
    description: [
      '현재 로그인된 사용자의 비밀번호를 변경합니다.',
      '',
      '**보안 검증:**',
      '- 현재 비밀번호 확인 필수',
      '- 새 비밀번호 복잡성 검사',
      '- 비밀번호 암호화 저장',
      '',
      '**사용자 경험:**',
      '- 바로 적용되어 다음 로그인부터 새 비밀번호 사용',
    ].join('\n'),
  })
  @ApiOkResponse({
    description: '비밀번호 변경 성공',
    schema: {
      example: { status: 200, message: auth.passwordChanged, data: null, },
    },
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 데이터',
    schema: {
      example: { status: 400, message: 'newPassword: 10자 이상, 영문/숫자/특수문자 포함', },
    },
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 요청',
    schema: {
      example: { status: 401, message: auth.invalidCredentials, },
    },
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('change-password')
  async changePassword(
    @Req() req: Request,
    @Body() changePasswordData: ChangePasswordDto
  ) {
    const user = req.user as JwtPayload;
    await this.authService.changePassword(user.userId, changePasswordData);
    return { message: auth.passwordChanged, data: null, };
  }

  /**
   * 비밀번호 찾기
   * @param forgotPasswordData 비밀번호 찾기 데이터
   * @returns 비밀번호 찾기 결과
   */
  @ApiOperation({
    summary: '📧 비밀번호 재설정 요청',
    description: [
      '이메일로 비밀번호 재설정 링크를 발송합니다.',
      '',
      '**이메일 발송:**',
      '- 등록된 이메일 주소로 재설정 링크 발송',
      '- 5분 내 확인 후 처리 필요',
      '- 보안을 위한 일회성 토큰 사용',
      '',
      '**처리 흐름:**',
      '1. 이메일 주소 입력',
      '2. 재설정 링크 이메일 수신',
      '3. 링크 클릭 후 새 비밀번호 설정',
    ].join('\n'),
  })
  @ApiOkResponse({
    description: '비밀번호 재설정 메일 발송 성공',
    schema: {
      example: { status: 200, message: auth.forgotPasswordEmailSent, data: null, },
    },
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 데이터',
    schema: {
      example: { status: 400, message: 'emlAddr: 올바른 이메일 형식을 입력해주세요.', },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordData: ForgotPasswordDto) {
    await this.authService.forgotPassword(forgotPasswordData);
    return { message: auth.forgotPasswordEmailSent, data: null, };
  }

  /**
   * 새 비밀번호 설정
   * @param newPasswordData 새 비밀번호 데이터
   * @returns 새 비밀번호 설정 결과
   */
  @ApiOperation({
    summary: '🆕 새 비밀번호 설정',
    description: [
      '비밀번호 재설정 토큰을 사용하여 새 비밀번호를 설정합니다.',
      '',
      '**필수 정보:**',
      '- 재설정 토큰 (resetToken)',
      '- 새 비밀번호 (복잡성 규칙 준수)',
      '',
      '**보안 처리:**',
      '- 토큰 유효성 및 만료 시간 검증',
      '- 새 비밀번호 암호화 저장',
      '- 사용된 토큰 자동 무효화',
    ].join('\n'),
  })
  @ApiOkResponse({
    description: '새 비밀번호 설정 성공',
    schema: {
      example: { status: 200, message: auth.newPasswordSet, data: null, },
    },
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 데이터',
    schema: {
      example: { status: 400, message: auth.resetTokenAndPasswordRequired, },
    },
  })
  @ApiResponse({
    status: 401,
    description: '임시 비밀번호가 유효하지 않음',
    schema: {
      example: { status: 401, message: auth.invalidOrExpiredResetToken, },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('new-password')
  async newPassword(@Body() newPasswordData: NewPasswordDto) {
    await this.authService.newPassword(newPasswordData);
    return { message: auth.newPasswordSet, data: null, };
  }
}
