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
  ApiResponse
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

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 회원가입
   * @param signUpData 회원가입 데이터
   * @returns 회원가입 결과
   */
  @ApiOperation({
    summary: '회원가입',
    description: '새로운 사용자를 등록합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 데이터',
  })
  @Throttle({ default: { limit: 5, ttl: 60000, }, })
  @Post('signup')
  signUp(@Body() signUpData: SignUpDto) {
    return this.authService.signUp(signUpData);
  }

  /**
   * 로그인
   * @param signInData 로그인 데이터
   * @param res 응답 객체
   * @returns 로그인 결과
   */
  @ApiOperation({
    summary: '로그인',
    description: '사용자 로그인을 처리하고, 인증 토큰을 쿠키에 설정합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
  })
  @Throttle({ default: { limit: 5, ttl: 60000, }, })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(
    @Body() signInData: SignInDto,
    @Res({ passthrough: true, }) res: Response
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

    return user;
  }

  /**
   * 토큰 재발급
   * @param req 요청 객체
   * @param res 응답 객체
   * @returns 재발급 결과
   */
  @ApiOperation({
    summary: '토큰 재발급',
    description: 'Refresh Token을 사용하여 새로운 Access Token과 Refresh Token을 발급받습니다.',
  })
  @ApiResponse({
    status: 200,
    description: '토큰 재발급 성공',
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패 (유효하지 않은 Refresh Token)',
  })
  @Throttle({ default: { limit: 10, ttl: 60000, }, })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res({ passthrough: true, }) res: Response) {
    const refreshToken = req.cookies['refreshToken'] as string;
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
   * @param req 요청 객체
   * @param res 응답 객체
   * @returns 로그아웃 결과
   */
  @ApiOperation({
    summary: '로그아웃',
    description: '사용자 세션을 종료하고 인증 쿠키를 삭제합니다.',
  })
  @ApiResponse({ status: 200, description: '로그아웃 성공', })
  @ApiResponse({ status: 401, description: '인증되지 않은 사용자', })
  @UseGuards(JwtAuthGuard)
  @Post('signout')
  @HttpCode(HttpStatus.OK)
  async signOut(
    @Req() req: Request & { user: { userId: string } },
    @Res({ passthrough: true, }) res: Response
  ) {
    await this.authService.signOut(req.user.userId);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
  }

  /**
   * 세션 조회
   * @param req 요청 객체
   * @returns 세션 정보
   */
  @ApiOperation({
    summary: '세션 조회',
    description: '현재 로그인된 사용자의 세션 정보를 반환합니다.',
  })
  @ApiResponse({ status: 200, description: '세션 정보 조회 성공', })
  @ApiResponse({ status: 401, description: '인증되지 않은 사용자', })
  @UseGuards(JwtAuthGuard)
  @Get('session')
  async session(@Req() req: Request & { user: JwtPayload }) {
    return this.authService.session(req.user.userId);
  }

  /**
   * 회원탈퇴
   * @param req 요청 객체
   * @param res 응답 객체
   * @returns 회원탈퇴 결과
   */
  @ApiOperation({
    summary: '회원 탈퇴',
    description: '현재 로그인된 사용자를 탈퇴 처리하고 관련 데이터를 삭제합니다.',
  })
  @ApiResponse({ status: 200, description: '회원 탈퇴 성공', })
  @ApiResponse({ status: 401, description: '인증되지 않은 사용자', })
  @Throttle({ default: { limit: 3, ttl: 60000, }, })
  @UseGuards(JwtAuthGuard)
  @Delete('withdraw')
  @HttpCode(HttpStatus.OK)
  async withdraw(
    @Req() req: Request & { user: JwtPayload },
    @Res({ passthrough: true, }) res: Response
  ) {
    await this.authService.withdraw(req.user.userId);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
  }

  /**
   * 비밀번호 변경
   * @param req 요청 객체
   * @param changePasswordData 비밀번호 변경 데이터
   * @returns 비밀번호 변경 결과
   */
  @ApiOperation({
    summary: '비밀번호 변경',
    description: '현재 로그인된 사용자의 비밀번호를 변경합니다.',
  })
  @ApiResponse({ status: 200, description: '비밀번호 변경 성공', })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터', })
  @ApiResponse({ status: 401, description: '인증되지 않은 사용자', })
  @Throttle({ default: { limit: 5, ttl: 60000, }, })
  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Req() req: Request & { user: JwtPayload },
    @Body() changePasswordData: ChangePasswordDto
  ) {
    await this.authService.changePassword(req.user.userId, changePasswordData);
  }

  /**
   * 비밀번호 찾기
   * @param forgotPasswordData 비밀번호 찾기 데이터
   * @returns 비밀번호 찾기 결과
   */
  @ApiOperation({
    summary: '비밀번호 찾기 (임시 비밀번호 발급)',
    description: '사용자 이메일로 임시 비밀번호를 발송합니다.',
  })
  @ApiResponse({ status: 200, description: '임시 비밀번호 발송 성공', })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없음', })
  @Throttle({ default: { limit: 3, ttl: 60000, }, })
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() forgotPasswordData: ForgotPasswordDto) {
    await this.authService.forgotPassword(forgotPasswordData);
  }

  /**
   * 새 비밀번호 설정
   * @param newPasswordData 새 비밀번호 설정 데이터
   * @returns 새 비밀번호 설정 결과
   */
  @ApiOperation({
    summary: '새 비밀번호 설정',
    description: '임시 비밀번호 확인 후 새 비밀번호를 설정합니다.',
  })
  @ApiResponse({ status: 200, description: '새 비밀번호 설정 성공', })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 데이터 또는 만료된 임시 비밀번호',
  })
  @Throttle({ default: { limit: 3, ttl: 60000, }, })
  @Post('new-password')
  @HttpCode(HttpStatus.OK)
  async newPassword(
    @Body() newPasswordData: NewPasswordDto
  ) {
    await this.authService.newPassword(newPasswordData);
  }
}
