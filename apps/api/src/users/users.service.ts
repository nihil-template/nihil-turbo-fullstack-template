import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { messages } from 'messages';
import { UpdateProfileDto } from '@repo/dto/DTO';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async getUsers() {
    return this.prisma.userInfo.findMany();
  }

  async getUserById(userId: string) {
    const user = await this.prisma.userInfo.findUnique({
      where: {
        userId,
      },
    });

    if (!user) {
      throw new NotFoundException(
        messages.users.userNotFound
      );
    }

    return user;
  }

  async getUserByEmail(emlAddr: string) {
    return this.prisma.userInfo.findUnique({
      where: {
        emlAddr,
      },
    });
  }

  async updateProfile(userId: string, updateProfileData: UpdateProfileDto) {
    const user = await this.prisma.userInfo.findUnique({
      where: {
        userId,
      },
    });

    if (!user) {
      throw new NotFoundException(
        messages.users.userNotFound
      );
    }

    return this.prisma.userInfo.update({
      where: {
        userId,
      },
      data: {
        userNm: updateProfileData.userNm,
      },
    });
  }
}
