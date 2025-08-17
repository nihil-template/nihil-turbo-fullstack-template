import { Injectable, type OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@repo/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
