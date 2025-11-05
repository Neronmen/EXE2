
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { GetUser } from 'src/modules/auth/guards/get-user.decorator';
import { JWTGuard } from 'src/modules/auth/guards/jwt.guard';
import { OrderStatus, User } from '@prisma/client';
import { CreateOrderFromCartDto } from '../dtos/create-order-from-cart.dto';
import { ADMIN_UPDATE_GROUP, UpdateOrderDto, USER_UPDATE_GROUP } from '../dtos/update-order.dto';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/guards/roles.decorator';
import { Role } from './role.enum';

@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(JWTGuard)
@Controller('api/v1/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // ===========================================================================
  // == Endpoints for Regular Users
  // ===========================================================================
  

  @ApiOperation({ summary: 'Tạo đơn hàng từ giỏ hàng' })
  @Post('from-cart')
  createFromCart(@GetUser() user: User, @Body() createOrderFromCartDto: CreateOrderFromCartDto) {
    return this.orderService.createFromCart(user.id, createOrderFromCartDto);
  }

  @ApiOperation({ summary: 'Lấy tất cả đơn hàng của tôi' })
  @Get()
  findAll(@GetUser() user: User) {
    return this.orderService.findAll(user.id);
  }

  @ApiOperation({ summary: 'Lấy chi tiết đơn hàng' })
  @Get(':id')
  findOne(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id, user.id);
  }

 
  @ApiOperation({ summary: 'Xóa đơn hàng (Soft delete)' })
  @Delete(':id')
  remove(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
    // Chuyển userId vào service để kiểm tra quyền
    return this.orderService.remove(id, user.id);
  }

  // ===========================================================================
  // == Endpoints for Admins
  // ===========================================================================

  @ApiOperation({ summary: '[Admin] Lấy tất cả đơn hàng trên hệ thống' })
  @UseGuards(JWTGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('admin/all')
  findAllForAdmin() {
    return this.orderService.findAllForAdmin();
  }

  @ApiOperation({ summary: '[Admin] Lấy chi tiết đơn hàng bất kỳ' })
  @UseGuards(JWTGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('admin/:id')
  findOneForAdmin(@Param('id', ParseIntPipe) id: number) {
    // Admin không cần truyền userId
    return this.orderService.findOne(id);
  }


}
