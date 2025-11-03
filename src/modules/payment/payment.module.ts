import { Module } from '@nestjs/common';
import { PaymentController } from './controllers/payment.controller';
import { PaymentService } from './services/payment.service';
import { ConfigModule } from '@nestjs/config';
import { TransactionService } from './services/transaction.service';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [ConfigModule, PrismaModule, AuthModule],
  controllers: [PaymentController],
  providers: [PaymentService, TransactionService],
})
export class PaymentModule {}
