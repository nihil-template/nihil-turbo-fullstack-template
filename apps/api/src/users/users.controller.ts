import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  Query
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery
} from '@nestjs/swagger';
import { GetUsersQueryDto, UpdateProfileDto } from '@repo/dto/DTO';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { JwtPayload } from '@/auth/jwt.strategy';
import { user } from '@repo/message';

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

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /**
   * 전체 사용자 목록 조회
   * @returns 사용자 목록
   */
  @ApiOperation({
    summary: '👥 전체 사용자 목록 조회',
    description: [
      '웹 애플리케이션의 모든 등록된 사용자 목록을 조회합니다.',
      '',
      '**관리자 기능:**',
      '- 전체 사용자의 기본 정보 확인',
      '- 가입일, 최근 로그인 시간 등 추적',
      '- 사용자 활성화 상태 모니터링',
      '',
      '**응답 데이터:**',
      '- 사용자 ID, 이메일, 이름, 역할',
      '- 프로필 이미지, 자기소개',
      '- 계정 생성/수정/삭제 일시',
    ].join('\n'),
  })
  @ApiOkResponse({
    description: '사용자 목록 조회 성공',
    schema: {
      example: {
        status: 200,
        data: { users: [ exampleUser, ], total: 1, },
      },
    },
  })
  @ApiQuery({ name: 'page', required: false, type: Number, description: '페이지 번호', })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: '페이지 당 항목 수', })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers(@Query() getUsersQueryDto: GetUsersQueryDto) {
    return this.usersService.getUsers(getUsersQueryDto);
  }

  /**
   * 특정 사용자 정보 조회 (ID)
   * @param userId 사용자 ID
   * @returns 사용자 정보
   */
  @ApiOperation({
    summary: '🔍 사용자 상세 정보 조회 (ID)',
    description: [
      '사용자 ID로 특정 사용자의 상세 정보를 조회합니다.',
      '',
      '**사용 사례:**',
      '- 사용자 프로필 페이지 표시',
      '- 관리자 대시보드에서 사용자 세부 정보 확인',
      '- 다른 API에서 사용자 검증',
      '',
      '**UUID 형태의 사용자 ID 필요**',
    ].join('\n'),
  })
  @ApiOkResponse({
    description: '사용자 정보 조회 성공',
    schema: {
      example: {
        status: 200,
        data: exampleUser,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: '사용자를 찾을 수 없음',
    schema: {
      example: { status: 404, message: user.userNotFound, },
    },
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('userId') userId: string) {
    return this.usersService.getUserById(userId);
  }

  /**
   * 이메일로 사용자 정보 조회
   * @param emlAddr 사용자 이메일 주소
   * @returns 사용자 정보
   */
  @ApiOperation({
    summary: '📧 이메일로 사용자 검색',
    description: [
      '이메일 주소로 사용자를 검색합니다.',
      '',
      '**활용 예시:**',
      '- 관리자 패널에서 사용자 검색',
      '- 사용자 존재 여부 확인',
      '- 고객 지원 시 계정 조회',
      '',
      '**완전 일치 검색 (부분 검색 불가)**',
    ].join('\n'),
  })
  @ApiOkResponse({
    description: '사용자 정보 조회 성공',
    schema: {
      example: {
        status: 200,
        data: exampleUser,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: '사용자를 찾을 수 없음',
    schema: {
      example: { status: 404, message: user.userNotFound, },
    },
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('email/:emlAddr')
  @HttpCode(HttpStatus.OK)
  async getUserByEmail(@Param('emlAddr') emlAddr: string) {
    return this.usersService.getUserByEmail(emlAddr);
  }

  /**
   * 내 프로필 정보 수정
   * @param req 요청 객체
   * @param updateProfileData 프로필 수정 데이터
   * @returns 수정된 사용자 정보
   */
  @ApiOperation({
    summary: '✏️ 프로필 정보 수정',
    description: [
      '현재 로그인된 사용자의 프로필을 업데이트합니다.',
      '',
      '**수정 가능 항목:**',
      '- 사용자 이름 (userNm)',
      '- 자기소개 (userBiogp)',
      '- 프로필 이미지 (proflImg)',
      '',
      '**보안:**',
      '- 본인 계정만 수정 가능',
      '- JWT 토큰 인증 필수',
    ].join('\n'),
  })
  @ApiOkResponse({
    description: '프로필 수정 성공',
    schema: {
      example: {
        status: 200,
        data: { ...exampleUser, userNm: '김철수', },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 데이터',
    schema: {
      example: { status: 400, message: 'userNm: 사용자명은 2자 이상이어야 합니다.', },
    },
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 요청',
    schema: {
      example: { status: 401, message: 'Unauthorized', },
    },
  })
  @ApiResponse({
    status: 404,
    description: '사용자를 찾을 수 없음',
    schema: {
      example: { status: 404, message: user.userNotFound, },
    },
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Put('profile')
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Req() req: Request & { user: JwtPayload },
    @Body() updateProfileData: UpdateProfileDto
  ) {
    console.log(updateProfileData);

    const authUser = req.user;
    return this.usersService.updateProfile(authUser.userId, updateProfileData);
  }
}
