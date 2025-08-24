import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from '@/prisma/prisma.service';
import { UsersService } from '@/users/users.service';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  NewPasswordDto,
  SignInDto,
  SignUpDto
} from '@repo/dto/DTO';

import * as bcrypt from 'bcrypt';
import { messages } from '@repo/message';
import { serverConfig } from '@repo/config/server.config';
import { commonConfig } from '@repo/config/common.config';

// JWT Payload 타입 정의
interface JwtPayload {
  userId: string;
  emlAddr: string;
  userNm: string;
  userRole: string;
}

interface ResetPasswordPayload {
  userId: string;
  purpose: 'reset-password';
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService
  ) { }

  /**
   * 회원가입
   * @param signUpData 회원가입 데이터
   * @returns 회원가입 결과
   */
  async signUp(signUpData: SignUpDto) {
    const { password, ...userInfo } = signUpData;

    return this.prisma.$transaction(async (tx) => {
      const findUser = await tx.userInfo.findUnique({
        where: { emlAddr: signUpData.emlAddr, },
      });

      if (findUser) {
        throw new ConflictException(
          messages.auth.conflictEmail
        );
      }

      const encptPswd = await bcrypt.hash(password, 10);

      const newUser = await tx.userInfo.create({
        data: {
          ...userInfo,
          UserCertInfo: {
            create: {
              encptPswd,
            },
          },
        },
      });

      return newUser;
    });
  }

  /**
   * 로그인
   * @param signInData 로그인 데이터
   * @returns 로그인 결과
   */
  async signIn(signInData: SignInDto) {
    const { emlAddr, password, } = signInData;

    const user = await this.usersService.getUserByEmail(emlAddr);
    if (!user) {
      throw new UnauthorizedException(
        messages.auth.invalidCredentials
      );
    }

    const userCert = await this.prisma.userCertInfo
      .findUnique({
        where: { userId: user.userId, },
      });

    if (!userCert) {
      // 이 경우는 데이터 정합성에 문제가 있는 상황이므로 서버 에러로 처리합니다.
      throw new InternalServerErrorException(
        messages.common.internalServerError
      );
    }

    const isPasswordMatching = await bcrypt.compare(
      password,
      userCert.encptPswd
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException(
        messages.auth.invalidCredentials
      );
    }

    const payload: JwtPayload = {
      userId: user.userId,
      emlAddr: user.emlAddr,
      userNm: user.userNm,
      userRole: user.userRole,
    };

    const [ acsToken, reshToken, ] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: serverConfig.jwt.access.secret,
        expiresIn: serverConfig.jwt.access.expiresIn,
      }),
      this.jwtService.signAsync(payload, {
        secret: serverConfig.jwt.refresh.secret,
        expiresIn: serverConfig.jwt.refresh.expiresIn,
      }),
    ]);

    // TODO: 리프레시 토큰을 DB에 저장하는 로직 추가 (선택 사항이지만 권장됨)
    // 리프레시 토큰 저장 로직 추가
    await this.prisma.userCertInfo.update({
      where: { userId: user.userId, },
      data: {
        reshToken,
      },
    });

    return { user, acsToken, reshToken, };
  }

  /**
   * 토큰 재발급
   * @param token 리프레시 토큰
   * @returns 재발급된 토큰 정보
   */
  async refresh(token: string) {
    if (!token) {
      throw new UnauthorizedException(messages.auth.refreshTokenNotFound);
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: serverConfig.jwt.refresh.secret,
      });

      const user = await this.usersService.getUserById(payload.userId);
      const userCert = await this.prisma.userCertInfo.findUnique({ where: { userId: user.userId, }, });

      // DB에 저장된 토큰과 일치하는지, 재사용된 토큰은 아닌지 검증
      if (!user || !userCert || userCert.reshToken !== token) {
        throw new UnauthorizedException(messages.auth.invalidRefreshToken);
      }

      // 새로운 토큰 쌍 발급 (Rotation)
      const newPayload: JwtPayload = {
        userId: user.userId,
        emlAddr: user.emlAddr,
        userNm: user.userNm,
        userRole: user.userRole,
      };
      const [ newAcsToken, newReshToken, ] = await Promise.all([
        this.jwtService.signAsync(newPayload, {
          secret: serverConfig.jwt.access.secret,
          expiresIn: serverConfig.jwt.access.expiresIn,
        }),
        this.jwtService.signAsync(newPayload, {
          secret: serverConfig.jwt.refresh.secret,
          expiresIn: serverConfig.jwt.refresh.expiresIn,
        }),
      ]);

      // DB에 새로운 Refresh Token 저장
      await this.prisma.userCertInfo.update({
        where: { userId: user.userId, },
        data: { reshToken: newReshToken, },
      });

      return { user, acsToken: newAcsToken, reshToken: newReshToken, };
    }
    catch {
      // 만료되었거나 유효하지 않은 토큰일 경우, DB의 토큰을 제거하여 강제 로그아웃 유도
      throw new UnauthorizedException(messages.auth.invalidRefreshToken);
    }
  }

  /**
   * 로그아웃
   * @param userId 사용자 ID
   */
  async signOut(userId: string) {
    await this.prisma.userCertInfo.update({
      where: { userId, },
      data: {
        reshToken: null,
      },
    });
  }

  /**
   * 세션 조회
   * @param userId 사용자 ID
   * @returns 세션 정보
   */
  async session(userId: string) {
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new UnauthorizedException(messages.auth.invalidCredentials);
    }
    return user;
  }

  /**
   * 회원탈퇴
   * @param userId 사용자 ID
   */
  async withdraw(userId: string) {
    const now = new Date();
    await this.prisma.$transaction([
      this.prisma.userInfo.update({
        where: { userId, },
        data: {
          actvtnYn: false,
          delDt: now,
        },
      }),
      this.prisma.userCertInfo.update({
        where: { userId, },
        data: {
          delYn: true,
          delDt: now,
        },
      }),
    ]);
  }

  /**
   * 비밀번호 변경
   * @param userId 사용자 ID
   * @param changePasswordData 비밀번호 변경 데이터
   * @returns 비밀번호 변경 결과
   */
  async changePassword(
    userId: string,
    changePasswordData: ChangePasswordDto
  ) {
    const { currentPassword, newPassword, } = changePasswordData;

    const userCert = await this.prisma.userCertInfo.findUnique({
      where: { userId, },
    });

    if (!userCert) {
      throw new InternalServerErrorException(
        messages.common.internalServerError
      );
    }

    const isPasswordMatching = await bcrypt.compare(
      currentPassword,
      userCert.encptPswd
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException(messages.auth.invalidCredentials);
    }

    const newEncptPswd = await bcrypt.hash(newPassword, 10);

    await this.prisma.userCertInfo.update({
      where: { userId, },
      data: {
        encptPswd: newEncptPswd,
      },
    });
  }

  /**
   * 비밀번호 찾기
   * @param forgotPasswordData 비밀번호 찾기 데이터
   * @returns 비밀번호 찾기 결과
   */
  async forgotPassword(
    forgotPasswordData: ForgotPasswordDto
  ) {
    const { emlAddr, } = forgotPasswordData;
    const user = await this.usersService.getUserByEmail(emlAddr);

    if (!user) {
      // 존재하지 않는 사용자인 경우에도 성공처럼 응답하여,
      // 이메일 주소 존재 여부를 통한 사용자 정보 유추를 방지합니다.
      return;
    }

    const payload: ResetPasswordPayload = { userId: user.userId, purpose: 'reset-password', };
    const resetToken = await this.jwtService.signAsync(payload, {
      secret: serverConfig.jwt.access.secret, // 또는 별도의 secret 사용
      expiresIn: '5m', // 유효시간 5분
    });

    // TODO: 프론트엔드 URL을 설정 파일에서 가져오도록 변경
    const appBaseUrl = /^https?:\/\//.test(commonConfig.appUrl)
      ? commonConfig.appUrl
      : 'http://localhost:3000';

    const resetLink = `${appBaseUrl.replace(/\/$/, '')}/auth/new-password?token=${resetToken}`;

    try {
      await this.mailerService.sendMail({
        to: user.emlAddr,
        from: `"No Reply" <${serverConfig.nodemailer.auth.user}>`,
        subject: messages.auth.resetPasswordEmailSubject(commonConfig.appName),
        text: messages.auth.resetPasswordEmailText(resetLink),
        html: messages.auth.resetPasswordEmailHtml(commonConfig.appName, resetLink),
      });
    }
    catch (error: unknown) {
      // 메일 전송 실패는 치명적 오류로 간주하지 않고 서버 로그에만 기록
      // 필요 시 Sentry 등으로 전송 가능
      if (error instanceof Error) {
        console.error('메일 전송 실패:', { message: error.message, stack: error.stack, });
      }
      else {
        console.error('메일 전송 실패:', error);
      }
    }
  }

  /**
   * 새 비밀번호 설정
   * @param newPasswordData 새 비밀번호 설정 데이터
   * @returns 새 비밀번호 설정 결과
   */
  async newPassword(
    newPasswordData: NewPasswordDto
  ) {
    const { resetToken, newPassword, } = newPasswordData;

    if (!resetToken || !newPassword) {
      throw new UnauthorizedException(messages.auth.resetTokenAndPasswordRequired);
    }

    try {
      const payload = await this.jwtService.verifyAsync<ResetPasswordPayload>(resetToken, {
        secret: serverConfig.jwt.access.secret,
      });

      if (!payload || payload.purpose !== 'reset-password') {
        throw new UnauthorizedException(messages.auth.invalidToken);
      }

      const encptPswd = await bcrypt.hash(newPassword, 10);

      await this.prisma.userCertInfo.update({
        where: { userId: payload.userId, },
        data: {
          encptPswd,
        },
      });
    }
    catch {
      throw new UnauthorizedException(messages.auth.invalidOrExpiredResetToken);
    }
  }
}
