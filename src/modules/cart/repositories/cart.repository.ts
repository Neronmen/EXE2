import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Injectable()
export class CartRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: number) {
    return await this.prisma.cart.findUnique({
      where: { userId: userId },
      include: {
        CartItem: { // Sửa 'items' thành 'CartItem'
          include: {
            Product: { // Sửa 'product' thành 'Product'
              select: { // Giữ nguyên ProductImage vì nó đúng với schema               
                ProductImage: { where: { isMain: true }, select: { url: true } },
                title: true,
                slug: true,
                basePrice: true,
                stock: true,
                PricingTier: true,
                SellerProfile: {select: {companyName: true, slug: true, shopAvatar: true}},

              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async create(userId: number) {
    return this.prisma.cart.create({
      data: { userId: userId },
    });
  }

  async findItem(cartId: number, productId: number) {
    return this.prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId: cartId, productId: productId } },
    });
  }

  async findItemByIdAndUserId(cartItemId: number, userId: number) {
    return this.prisma.cartItem.findFirst({
      where: { id: cartItemId, Cart: { userId: userId } },
      include: { Product: true }, // Sửa 'product' thành 'Product'
    });
  }

  async createItem(cartId: number, productId: number, quantity: number) {
    return this.prisma.cartItem.create({
      data: {
        cartId: cartId,
        productId: productId,
        quantity: quantity,
      },
    });
  }

  async updateItemQuantity(cartItemId: number, newQuantity: number) {
    return this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: newQuantity },
    });
  }

  async incrementItemQuantity(cartItemId: number, quantity: number) {
    return this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: { increment: quantity } },
    });
  }

  async deleteItem(cartItemId: number) {
    return this.prisma.cartItem.delete({ where: { id: cartItemId } });
  }
}
