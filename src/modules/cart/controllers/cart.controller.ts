import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JWTGuard } from 'src/modules/auth/guards/jwt.guard';
import { GetUser } from 'src/modules/auth/guards/get-user.decorator';
import { User } from '@prisma/client';
import { CartService } from '../services/cart.service';
import { AddToCartDto } from '../dtos/add-to-cart.dto';
import { UpdateCartItemDto } from '../dtos/update-cart-item.dto';

@ApiTags('Cart')
@ApiBearerAuth()
@UseGuards(JWTGuard)
@Controller('api/v1/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Lấy giỏ hàng của tôi' })
  @Get()
  getCart(@GetUser() user: User) {
    return this.cartService.getCart(user.id);
  }

  @ApiOperation({ summary: 'Thêm sản phẩm vào giỏ hàng' })
  @Post('items')
  addItem(@GetUser() user: User, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addItemToCart(user.id, addToCartDto);
  }

  @ApiOperation({ summary: 'Cập nhật số lượng sản phẩm trong giỏ hàng' })
  @Put('items/:itemId')
  updateItem(
    @GetUser() user: User,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateCartItem(user.id, itemId, updateCartItemDto);
  }

  @ApiOperation({ summary: 'Xóa sản phẩm khỏi giỏ hàng' })
  @Delete('items/:itemId')
  removeItem(
    @GetUser() user: User,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return this.cartService.removeItemFromCart(user.id, itemId);
  }
}
