import { Controller, Post, Body, Get, Query, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VnpayQueryDto } from '../dtos/vnpay-query.dto'; // Giữ nguyên
import { JWTGuard } from 'src/modules/auth/guards/jwt.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/guards/roles.decorator';
import { GetUser } from 'src/modules/auth/guards/get-user.decorator';
import { User } from '@prisma/client';
import { TransactionService } from '../services/transaction.service';
import { PaginationQueryDto } from 'src/modules/payment/dtos/pagination-query.dto';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly transactionService: TransactionService,
  ) {}

  @ApiOperation({ summary: 'Tạo URL thanh toán VNPAY' })
  @ApiBearerAuth()
  @UseGuards(JWTGuard)
  @Post('create-vnpay-url')
  async createVnpayUrl(@Body() createPaymentDto: CreatePaymentDto, @Req() req: Request) {
    const ipAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const paymentUrl = await this.paymentService.createVnpayUrl(createPaymentDto.orderId, ipAddr as string);
    return { url: paymentUrl };
  }

  @ApiOperation({ summary: 'Xử lý kết quả trả về từ VNPAY' })
  @Get('vnpay-return')
  async vnpayReturn(@Query() query: VnpayQueryDto) {
    const result = await this.paymentService.handleVnpayReturn(query);
    // Here you can redirect the user to a frontend page showing the payment result
    // For example: res.redirect(`http://your-frontend.com/payment-result?code=${result.code}`)
    return result;
  }

  @ApiOperation({ summary: 'Lấy lịch sử giao dịch của tôi' })
  @ApiBearerAuth()
  @UseGuards(JWTGuard)
  @Get('transactions/me')
  async getMyTransactions(
    @GetUser() user: User,
    @Query() query: PaginationQueryDto,
  ) {
    return this.transactionService.getMyTransactions(user, query.skip, query.take);
  }

  @ApiOperation({ summary: 'Lấy tất cả lịch sử giao dịch (Admin)' })
  @ApiBearerAuth()
  @UseGuards(JWTGuard, RolesGuard)
  @Roles(1)
  @Get('transactions/all')
  async getAllTransactions(@Query() query: PaginationQueryDto) {
    return this.transactionService.getAllTransactions(query.skip, query.take);
  }
}
