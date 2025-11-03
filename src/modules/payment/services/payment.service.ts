import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import * as crypto from 'crypto';
import * as qs from 'qs';
import { VnpayQueryDto } from '../dtos/vnpay-query.dto';
import { PaymentStatus } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async createVnpayUrl(orderId: number, ipAddr: string): Promise<string> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn hàng.');
    }

    const tmnCode = this.configService.get<string>('VNPAY_TMN_CODE');
    const secretKey = this.configService.get<string>('VNPAY_HASH_SECRET');
    let vnpUrl = this.configService.get<string>('VNPAY_URL');
    const returnUrl = this.configService.get<string>('VNPAY_RETURN_URL');

    if (!tmnCode || !secretKey || !vnpUrl || !returnUrl) {
      throw new Error('VNPAY configuration is missing in environment variables.');
    }

    const date = new Date();
    const createDate = this.formatDate(date);
    const amount = order.totalAmount * 100; // VNPAY requires amount in cents
    const orderInfo = `Thanh toan don hang ${orderId}`;
    const txnRef = `${orderId}-${date.getTime()}`;

    // Create or update payment record
    await this.prisma.payment.upsert({
        where: { orderID: orderId },
        update: {
            amount: order.totalAmount,
            status: 'PENDING',
            vnp_TxnRef: txnRef,
        },
        create: {
            orderID: orderId,
            amount: order.totalAmount,
            status: 'PENDING',
            vnp_TxnRef: txnRef,
        },
    });

    let vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: tmnCode,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: txnRef,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: 'other',
      vnp_Amount: amount,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };

    // Sắp xếp các tham số theo thứ tự alphabet và mã hóa chúng
    const signData = qs.stringify(vnp_Params, { encode: false, sort: (a, b) => a.localeCompare(b) });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;

    vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false, sort: (a, b) => a.localeCompare(b) });
    return vnpUrl;
  }

  async handleVnpayReturn(query: VnpayQueryDto): Promise<any> {
    const secureHash = query.vnp_SecureHash;
    delete query.vnp_SecureHash;

    const secretKey = this.configService.get<string>('VNPAY_HASH_SECRET');
    if (!secretKey) {
      throw new Error('VNPAY_HASH_SECRET is not configured in environment variables.');
    }

    // Sắp xếp các tham số theo thứ tự alphabet và mã hóa chúng
    const signData = qs.stringify(query, { encode: false, sort: (a, b) => a.localeCompare(b) });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      const payment = await this.prisma.payment.findFirst({
        where: { vnp_TxnRef: query.vnp_TxnRef },
      });

      if (!payment) {
        return { code: '01', message: 'Order not found' };
      }

      // Check if payment has already been processed
      if (payment.status !== 'PENDING') {
        return { code: '02', message: 'Order already confirmed' };
      }

      const paymentStatus: PaymentStatus = query.vnp_ResponseCode === '00' ? 'SUCCESS' : 'FAILED';
      
      const updatePaymentData = {
        status: paymentStatus,
        vnp_Amount: Number(query.vnp_Amount) / 100,
        vnp_BankCode: query.vnp_BankCode,
        vnp_BankTranNo: query.vnp_BankTranNo,
        vnp_CardType: query.vnp_CardType,
        vnp_OrderInfo: query.vnp_OrderInfo,
        vnp_PayDate: query.vnp_PayDate,
        vnp_ResponseCode: query.vnp_ResponseCode,
        vnp_TmnCode: query.vnp_TmnCode,
        vnp_TransactionNo: query.vnp_TransactionNo,
      };

      // Update order status if payment is successful
      if (paymentStatus === 'SUCCESS') {
        await this.prisma.$transaction([
          this.prisma.payment.update({ where: { id: payment.id }, data: updatePaymentData }),
          this.prisma.order.update({
            where: { id: payment.orderID },
            data: { status: 'CONFIRMED' }
          })
        ]);
      } else {
        await this.prisma.payment.update({ where: { id: payment.id }, data: updatePaymentData });
      }

      return { code: query.vnp_ResponseCode, message: 'Confirm success' };
    } else {
      return { code: '97', message: 'Checksum failed' };
    }
  }

  private formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const HH = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}${MM}${dd}${HH}${mm}${ss}`;
  }
}
