import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async getMyTransactions(user: User, skip: number, take: number) {
    const whereClause = { order: { userID: user.id } };

    const [transactions, total] = await this.prisma.$transaction([
      this.prisma.payment.findMany({
        where: whereClause,
        include: {
          order: {
            select: { id: true, totalAmount: true, status: true },
          },
        },
        skip,
        take: take === -1 ? undefined : take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.payment.count({ where: whereClause }),
    ]);

    return { data: transactions, total };
  }

  async getAllTransactions(skip: number, take: number) {
    const [transactions, total] = await this.prisma.$transaction([
      this.prisma.payment.findMany({
        include: {
          order: {
            select: {
              id: true,
              totalAmount: true,
              status: true,
              user: { select: { id: true, email: true, name: true } },
            },
          },
        },
        skip,
        take: take === -1 ? undefined : take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.payment.count(),
    ]);
    return { data: transactions, total };
  }
}
