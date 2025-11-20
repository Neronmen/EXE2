import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VnpayQueryDto } from '../dtos/vnpay-query.dto';
import { JWTGuard } from 'src/modules/auth/guards/jwt.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/guards/roles.decorator';
import { GetUser } from 'src/modules/auth/guards/get-user.decorator';
import { User } from '@prisma/client';
import { TransactionService } from '../services/transaction.service';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { Role } from './role.enum';

@ApiTags('Payment')
@Controller('api/v1/payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly transactionService: TransactionService,
  ) { }

  @ApiOperation({ summary: 'Tạo URL thanh toán VNPAY' })
  @ApiBearerAuth()
  @UseGuards(JWTGuard)
  @Post('create-vnpay-url')
  async createVnpayUrl(@Body() createPaymentDto: CreatePaymentDto, @Req() req: any) {
    const ipAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    return this.paymentService.createVnpayUrl(createPaymentDto.orderId, ipAddr,req);
  }

  @ApiOperation({ summary: 'Xử lý kết quả trả về từ VNPAY' })
  @Get('vnpay-return')
  async vnpayReturn(@Query() query: VnpayQueryDto, @Req() req: any, @Res() res: any) {
    console.log("dsdsadsadasdasdasdas")
    const transactionId = req.query.vnp_TxnRef;
    await this.paymentService.handleVnpayReturn(query, Number(transactionId));

    const FE_URL = process.env.FE_URL || 'http://localhost:3000';
    const queryParams = new URLSearchParams(req.query as any).toString();

    return res.redirect(`${FE_URL}/payment/return?${queryParams}`);
  }

  @ApiOperation({ summary: 'Lấy lịch sử giao dịch của tôi' })
  @ApiBearerAuth()
  @UseGuards(JWTGuard)
  @Get('transactions/me')
  async getMyTransactions(@GetUser() user: User, @Query() query: PaginationQueryDto) {
    return this.transactionService.getMyTransactions(user, query.skip, query.take);
  }

  @ApiOperation({ summary: 'Lấy tất cả lịch sử giao dịch (Admin)' })
  @ApiBearerAuth()
  @UseGuards(JWTGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('transactions/all')
  async getAllTransactions(@Query() query: PaginationQueryDto) {
    return this.transactionService.getAllTransactions(query.skip, query.take);
  }
}