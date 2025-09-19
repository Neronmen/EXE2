import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('✅ Connected to database!');
    } catch (err) {
      this.logger.error('❌ Database connection failed:', err);
      process.exit(1); // dừng service nếu DB ko kết nối được
    }
  }
}
