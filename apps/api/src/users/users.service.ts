import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { user } from '@repo/message';
import { GetUsersQueryDto, UpdateProfileDto } from '@repo/dto/DTO';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async getUsers(getUsersQueryDto: GetUsersQueryDto) {
    const { page, limit, } = getUsersQueryDto;

    const usePagination = typeof page === 'number' && page > 0 && typeof limit === 'number' && limit > 0;

    if (usePagination) {
      const skip = (page - 1) * limit;
      const [ users, total, ] = await this.prisma.$transaction([
        this.prisma.userInfo.findMany({
          skip,
          take: limit,
          orderBy: {
            crtDt: 'desc',
          },
        }),
        this.prisma.userInfo.count(),
      ]);
      return { users, total, };
    }
    else {
      const users = await this.prisma.userInfo.findMany({
        orderBy: {
          crtDt: 'desc',
        },
      });
      return { users, total: users.length, };
    }
  }

  async getUserById(userId: string) {
    const userData = await this.prisma.userInfo.findUnique({
      where: {
        userId,
      },
    });

    if (!userData) {
      throw new NotFoundException(
        user.userNotFound
      );
    }

    return userData;
  }

  async getUserByEmail(emlAddr: string) {
    const userData = await this.prisma.userInfo.findUnique({
      where: {
        emlAddr,
      },
    });

    if (!userData) {
      throw new NotFoundException(user.userNotFound);
    }

    return userData;
  }

  async updateProfile(userId: string, updateProfileData: UpdateProfileDto) {
    const userData = await this.prisma.userInfo.findUnique({
      where: {
        userId,
      },
    });

    if (!userData) {
      throw new NotFoundException(
        user.userNotFound
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
