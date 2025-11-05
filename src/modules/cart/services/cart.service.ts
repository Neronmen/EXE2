import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { AddToCartDto } from '../dtos/add-to-cart.dto';
import { UpdateCartItemDto } from '../dtos/update-cart-item.dto';
import { successResponse } from 'src/common/utils/response.util';
import { CartRepository } from '../repositories/cart.repository';

@Injectable()
export class CartService {
  constructor(
    private readonly prisma: PrismaService, // Giữ lại để kiểm tra product
    private readonly cartRepository: CartRepository,
  ) {}

  private async findOrCreateCart(userId: number) {
    let cart = await this.cartRepository.findByUserId(userId);

    if (!cart) {
      // findByUserId đã bao gồm items, nên cần trả về object tương tự
      const newCart = await this.cartRepository.create(userId);
      return { ...newCart, CartItem: [] }; // Sửa 'items' thành 'CartItem'
    }
    return cart;
  }

  async getCart(userId: number) {
    const cart = await this.cartRepository.findByUserId(userId);

    if (!cart) {
      const newCart = await this.findOrCreateCart(userId);
      return successResponse(200, { ...newCart, CartItem: [] }, 'Giỏ hàng của bạn đang trống.'); // Sửa 'items' thành 'CartItem'
    }
    return successResponse(200, cart, 'Lấy giỏ hàng thành công.');
  }

  async addItemToCart(userId: number, addToCartDto: AddToCartDto) {
    const { productId, quantity } = addToCartDto;

    // Service vẫn chịu trách nhiệm kiểm tra logic nghiệp vụ như sản phẩm có tồn tại không
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Sản phẩm không tồn tại.');
    if (product.stock < quantity) throw new BadRequestException('Không đủ hàng trong kho.');
    if (product.isDeleted) throw new BadRequestException('Sản phẩm đã bị xóa.');

    const cart = await this.findOrCreateCart(userId);

    const existingItem = await this.cartRepository.findItem(cart.id, productId);

    if (existingItem) {
      const updatedItem = await this.cartRepository.incrementItemQuantity(existingItem.id, quantity);
      return successResponse(200, updatedItem, 'Cập nhật số lượng sản phẩm trong giỏ hàng thành công.');
    } else {
      const newItem = await this.cartRepository.createItem(cart.id, productId, quantity);
      return successResponse(201, newItem, 'Thêm sản phẩm vào giỏ hàng thành công.');
    }
  }

  async updateCartItem(userId: number, cartItemId: number, updateDto: UpdateCartItemDto) {
    const cartItem = await this.cartRepository.findItemByIdAndUserId(cartItemId, userId);

    if (!cartItem) throw new NotFoundException('Sản phẩm không có trong giỏ hàng.');
    if (cartItem.Product.stock < updateDto.quantity) throw new BadRequestException('Không đủ hàng trong kho.'); // Sửa 'product' thành 'Product'

    const updatedItem = await this.cartRepository.updateItemQuantity(cartItemId, updateDto.quantity);

    return successResponse(200, updatedItem, 'Cập nhật giỏ hàng thành công.');
  }

  async removeItemFromCart(userId: number, cartItemId: number) {
    // Kiểm tra xem item có thuộc giỏ hàng của user không
    const cartItem = await this.cartRepository.findItemByIdAndUserId(cartItemId, userId);

    if (!cartItem) throw new NotFoundException('Sản phẩm không có trong giỏ hàng.');

    await this.cartRepository.deleteItem(cartItemId);
    return successResponse(200, null, 'Xóa sản phẩm khỏi giỏ hàng thành công.');
  }
}
