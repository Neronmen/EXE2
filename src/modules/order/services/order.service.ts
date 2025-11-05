
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { CreateOrderFromCartDto } from '../dtos/create-order-from-cart.dto';
import { errorResponse, successResponse } from 'src/common/utils/response.util';
import { OrderStatus, Prisma } from '@prisma/client';
import { error } from 'node:console';

type PrismaTransactionClient = Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>;

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * @description Logic cốt lõi để tạo đơn hàng, được sử dụng bởi cả `create` và `createFromCart`.
   * @param tx - Prisma Transaction Client
   * @param userId - ID người dùng
   * @param createOrderDto - DTO chứa thông tin đơn hàng
   * @returns Order đã được tạo
   */
  private async _createOrderLogic(tx: PrismaTransactionClient, userId: number, createOrderDto: CreateOrderDto) {
    let totalAmount = 0;
    const orderItemsData: { productId: number; quantity: number; price: number }[] = [];

    const address = await tx.address.findFirst({
      where: { id: createOrderDto.addressId, userID: userId },
    });
    if (!address) {
      throw new BadRequestException(`Địa chỉ với ID ${createOrderDto.addressId} không hợp lệ hoặc không thuộc về bạn.`);
    }

    for (const item of createOrderDto.items) {
      const product = await tx.product.findUnique({
        where: { id: item.productId },
        include: { PricingTier: true },
      });

      if (!product) throw new NotFoundException(`Sản phẩm với ID ${item.productId} không tồn tại.`);
      if (product.stock < item.quantity) throw new BadRequestException(`Không đủ hàng cho sản phẩm '${product.title}'.`);

      let finalPrice: number = product.basePrice;
      const pricingTier = product.PricingTier.sort((a, b) => b.minQty - a.minQty).find(
        (tier) => item.quantity >= tier.minQty,
      );
      if (pricingTier) finalPrice = pricingTier.price;

      totalAmount += finalPrice * item.quantity;
      orderItemsData.push({ productId: item.productId, quantity: item.quantity, price: finalPrice });

      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // Sử dụng repository để tạo order
    const order = await this.orderRepository.create(
      tx,
      userId,
      createOrderDto.addressId,
      totalAmount,
      orderItemsData.map((item) => ({ productID: item.productId, quantity: item.quantity, price: item.price })),
    );

    return order;
  }

  async createFromCart(userId: number, createOrderFromCartDto: CreateOrderFromCartDto) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId }, // Sửa lại: schema là `userId`
      include: {
        CartItem: {
          include: {
            Product: true, // Lấy thông tin sản phẩm để kiểm tra tồn kho
          },
        },
      },
    });

    if (!cart || cart.CartItem.length === 0) {
      throw new BadRequestException('Giỏ hàng của bạn đang trống.');
    }

    // Kiểm tra lại tồn kho của tất cả sản phẩm trong giỏ hàng trước khi tạo đơn
    cart.CartItem.forEach(item => {
      if (item.Product.stock < item.quantity) {
        throw new BadRequestException(`Không đủ hàng cho sản phẩm '${item.Product.title}'.`);
      }
    });

    // Chuyển đổi CartItem[] thành định dạng mà hàm create() mong đợi
    const createOrderDto: CreateOrderDto = {
      addressId: createOrderFromCartDto.addressId,
      items: cart.CartItem.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    // Gọi hàm create() đã có và thêm logic xóa giỏ hàng
    return this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      // 1. Tái sử dụng logic tạo đơn hàng
      const order = await this._createOrderLogic(tx, userId, createOrderDto);

      // 2. Xóa các sản phẩm trong giỏ hàng sau khi đã tạo đơn hàng thành công
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return successResponse(201, order, 'Tạo đơn hàng từ giỏ hàng thành công.');
    });
  }

  async create(userId: number, createOrderDto: CreateOrderDto) {
    return this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      const order = await this._createOrderLogic(tx, userId, createOrderDto);
      return successResponse(201, order, 'Tạo đơn hàng thành công.');
    });
  }

  async findAll(userId: number) {
    const orders = await this.orderRepository.findAll(userId);
    return successResponse(200, orders, 'Lấy danh sách đơn hàng thành công.');
  }

  async findOne(id: number, userId?: number) {
    const order = await this.orderRepository.findOne(id, userId);
    if (!order) {
      throw new NotFoundException(`Đơn hàng với ID ${id} không tồn tại hoặc không có quyền truy cập.`);
    }
    return successResponse(200, order, 'Lấy chi tiết đơn hàng thành công.');
  }

  async update(id: number, userId: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      const order = await tx.order.findFirst({
        where: { id, userID: userId },
        include: { items: true },
      });

      if (!order) {
        throw new NotFoundException(`Đơn hàng với ID ${id} không tồn tại hoặc bạn không có quyền truy cập.`);
      }

      const initialStatus = order.status;

      // Ngăn chặn cập nhật đơn hàng đã ở trạng thái cuối
      if ( order.status !== OrderStatus.PENDING) {
        return errorResponse(400, "Không thể hủy đơn hàng");       
      }

      // Logic hoàn trả hàng vào kho khi hủy đơn
      if (order.status === OrderStatus.PENDING) {
        for (const item of order.items) {
          await tx.product.update({
            where: { id: item.productID },
            data: { stock: { increment: item.quantity } },
          });
        }
      }

      // Chỉ gọi repository để update, không cần trả về giá trị trong transaction
      await this.orderRepository.update(id);
      // Lấy lại thông tin order đã cập nhật để trả về
      const updatedOrder = await tx.order.findUnique({ where: { id } });
      return successResponse(200, updatedOrder, 'Cập nhật đơn hàng thành công.');
    });
  }

  async remove(id: number, userId: number) {
    // 1. Kiểm tra quyền sở hữu và sự tồn tại của đơn hàng trước khi vào transaction
    const order = await this.prisma.order.findFirst({
      where: { id, userID: userId },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException(`Đơn hàng với ID ${id} không tồn tại hoặc bạn không có quyền xóa.`);
    }

    // 2. Thực hiện logic trong transaction
    await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      // Nếu đơn hàng chưa bị hủy, cần hoàn kho trước khi xóa
      if (order.status === OrderStatus.PENDING) {
        for (const item of order.items) {
          await tx.product.update({
            where: { id: item.productID },
            data: { stock: { increment: item.quantity } },
          });
        }
      }
      // Thực hiện xóa vĩnh viễn
      await this.orderRepository.remove(id);
    });

    return successResponse(200, null, 'Xóa đơn hàng thành công.');
  }

  // ===========================================================================
  // == Admin-specific Methods
  // ===========================================================================

  async findAllForAdmin() {
    // Gọi repository mà không có userId để lấy tất cả
    const orders = await this.orderRepository.findAllForAdmin();
    return successResponse(200, orders, 'Lấy tất cả đơn hàng thành công.');
  }

  // async updateForAdmin(id: number, updateOrderDto: UpdateOrderDto) {
  //   return this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
  //     const order = await tx.order.findUnique({
  //       where: { id },
  //       include: { items: true },
  //     });
  //     if (!order) {
  //       throw new NotFoundException(`Đơn hàng với ID ${id} không tồn tại.`);
  //     }

  //     const initialStatus = order.status;

  //     // Admin có thể cập nhật, nhưng cũng cần logic hoàn kho nếu hủy (và trạng thái trước đó chưa phải là hủy)
  //     if (updateOrderDto.status === OrderStatus.CANCELLED && initialStatus !== OrderStatus.CANCELLED) {
  //       for (const item of order.items) {
  //         await tx.product.update({
  //           where: { id: item.productID },
  //           data: { stock: { increment: item.quantity } },
  //         });
  //       }
  //     }

  //     await this.orderRepository.update(id, updateOrderDto);
  //     const updatedOrder = await tx.order.findUnique({ where: { id } });
  //     return successResponse(200, updatedOrder, 'Cập nhật đơn hàng thành công.');
  //   });
  // }

  async removeForAdmin(id: number) {
    // 1. Kiểm tra sự tồn tại của đơn hàng trước khi vào transaction
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException(`Đơn hàng với ID ${id} không tồn tại.`);
    }

    // 2. Thực hiện logic trong transaction
    await this.prisma.$transaction(async (tx: PrismaTransactionClient) => {
      // Nếu đơn hàng chưa bị hủy, cần hoàn kho trước khi xóa
      if (order.status !== OrderStatus.CANCELLED) {
        for (const item of order.items) {
          await tx.product.update({
            where: { id: item.productID },
            data: { stock: { increment: item.quantity } },
          });
        }
      }
      // Thực hiện xóa vĩnh viễn
      await this.orderRepository.remove(id);
    });

    return successResponse(200, null, '[Admin] Xóa đơn hàng thành công.');
  }
}
