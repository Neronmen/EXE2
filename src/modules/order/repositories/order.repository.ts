
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { Prisma, PrismaClient } from '@prisma/client';
 
type PrismaTransactionClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    tx: PrismaTransactionClient,
    userId: number,
    addressId: number,
    totalAmount: number,
    items: Prisma.OrderItemCreateManyOrderInput[],
  ) {
    return tx.order.create({
      data: {
        userID: userId,
        addressID: addressId,
        totalAmount: totalAmount,
        paymentMethod: 'VNPAY',
        items: { createMany: { data: items } }, // Tối ưu: Dùng createMany
      },
      include: { items: true },
    });
  }
 
  async findAll(userId: number) {
    return this.prisma.order.findMany({
      where: { userID: userId },
      include: {
        items: true,
      },
    });
  }
 
  async findAllForAdmin() {
    return this.prisma.order.findMany({
      select: { totalAmount: true, status: true, id: true, createdAt: true, paymentMethod: true, user: {select: {name: true, email: true, phone: true, avatar: true}}},
    });
  }
 
  async findOne(id: number, userId?: number) {
    const whereCondition: Prisma.OrderWhereInput = { id };
    if (userId) {
      whereCondition.userID = userId;
    }
    return this.prisma.order.findFirst({
      where: whereCondition,
      include: {
        address: true,
        items: {
          select: {
            productID: true,
            quantity: true,
            price: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: { where: { isMain: true }, select: { url: true } },
                SellerProfile: { select: { companyName: true, slug: true, shopAvatar: true } },
              },
            },
          },
        },
      },
    });
  }
 
  async update(id: number) {
    return this.prisma.order.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
  }
 
  async remove(id: number) {
    return this.prisma.order.delete({ where: { id } });
  }
}
