import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { User } from '@prisma/client';
import { successResponse } from 'src/common/utils/response.util';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async getMyTransactions(user: User, skip: number, take: number) {
    const whereClause = { order: { userID: user.id } };

    const [transactions, total] = await this.prisma.$transaction([
      this.prisma.payment.findMany({
        where: whereClause,
        
        skip,
        take: take === -1 ? undefined : take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.payment.count({ where: whereClause }),
    ]);
    const result = {data: transactions, total };
    return successResponse(200, result, 'Transactions fetched successfully');
  }

  async getAllTransactions(skip: number, take: number) {
    const [transactions, total] = await this.prisma.$transaction([
      this.prisma.payment.findMany({       
        skip,
        take: take === -1 ? undefined : take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.payment.count(),
    ]);
    
    return successResponse(200, { data: transactions, total }, 'Transactions fetched successfully');
  }
  
}
