import { UsersService } from '@/users/users.service';
import { Controller, Get, Param, HttpCode, HttpStatus, UseGuards, Put, Body, Req } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { UpdateProfileDto } from '@repo/dto/DTO';
import type { Request } from 'express';
import { JwtPayload } from '@/auth/jwt.strategy';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /**
   * 전체 사용자 목록 조회
   * @returns 사용자 목록
   */
  @ApiOperation({
    summary: '전체 사용자 목록 조회',
    description: '모든 사용자 목록을 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '사용자 목록 조회 성공', })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers() {
    return this.usersService.getUsers();
  }

  /**
   * 특정 사용자 정보 조회 (ID)
   * @param userId 사용자 ID
   * @returns 사용자 정보
   */
  @ApiOperation({
    summary: 'ID로 사용자 정보 조회',
    description: '사용자 ID를 사용하여 특정 사용자 정보를 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '사용자 정보 조회 성공', })
  @ApiResponse({ status: 401, description: '인증되지 않은 사용자', })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없음', })
  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('userId') userId: string) {
    return this.usersService.getUserById(userId);
  }

  /**
   * 특정 사용자 정보 조회 (이메일)
   * @param emlAddr 사용자 이메일
   * @returns 사용자 정보
   */
  @ApiOperation({
    summary: '이메일로 사용자 정보 조회',
    description: '이메일 주소를 사용하여 특정 사용자 정보를 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '사용자 정보 조회 성공', })
  @ApiResponse({ status: 401, description: '인증되지 않은 사용자', })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없음', })
  @Get('email/:emlAddr')
  @HttpCode(HttpStatus.OK)
  async getUserByEmail(@Param('emlAddr') emlAddr: string) {
    return this.usersService.getUserByEmail(emlAddr);
  }

  /**
   * 내 프로필 정보 수정
   * @param req 요청 객체
   * @param updateProfileData 프로필 수정 데이터
   * @returns 프로필 수정 결과
   */
  @ApiOperation({
    summary: '내 프로필 정보 수정',
    description: '현재 로그인된 사용자의 프로필 정보를 수정합니다.',
  })
  @ApiResponse({ status: 200, description: '프로필 수정 성공', })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터', })
  @ApiResponse({ status: 401, description: '인증되지 않은 사용자', })
  @Throttle({ default: { limit: 10, ttl: 60000, }, })
  @UseGuards(JwtAuthGuard)
  @Put('profile')
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Req() req: Request & { user: JwtPayload },
    @Body() updateProfileData: UpdateProfileDto
  ) {
    return this.usersService.updateProfile(req.user.userId, updateProfileData);
  }
}
