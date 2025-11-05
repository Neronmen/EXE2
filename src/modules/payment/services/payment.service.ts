import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { VnpayQueryDto } from '../dtos/vnpay-query.dto';
import { PaymentStatus } from '@prisma/client';
import { errorResponse, successResponse } from 'src/common/utils/response.util';
import { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat, HashAlgorithm } from "vnpay";


@Injectable()
export class PaymentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async createVnpayUrl(orderId: number, ipAddr: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return errorResponse(400, 'Order not found', 'NOT_FOUND');
    }

    // const tmnCode = this.configService.get<string>('VNPAY_TMN_CODE');
    // const secretKey = this.configService.get<string>('VNPAY_HASH_SECRET');
    // let vnpUrl = this.configService.get<string>('VNPAY_URL');
    // const returnUrl = this.configService.get<string>('VNPAY_RETURN_URL');

    // if (!tmnCode || !secretKey || !vnpUrl || !returnUrl) {
    //   throw new Error('VNPAY configuration is missing in environment variables.');
    // }

    // const date = new Date();
    // const createDate = this.formatDate(date);
    // const amount = order.totalAmount * 100; // VNPAY requires amount in cents
    // const orderInfo = `Thanh toan don hang ${orderId}`;
    // const txnRef = `${orderId}-${date.getTime()}`;

    // Create or update payment record
   const payment = await this.prisma.payment.upsert({
        where: { orderID: orderId },
        update: {
            amount: order.totalAmount,
            status: 'PENDING',
            
        },
        create: {
            orderID: orderId,
            amount: order.totalAmount,
            status: 'PENDING',
            
        },
    });

    // let vnp_Params = {
    //   vnp_Version: '2.1.0',
    //   vnp_Command: 'pay',
    //   vnp_TmnCode: tmnCode,
    //   vnp_Locale: 'vn',
    //   vnp_CurrCode: 'VND',
    //   vnp_TxnRef: txnRef,
    //   vnp_OrderInfo: orderInfo,
    //   vnp_OrderType: 'other',
    //   vnp_Amount: amount,
    //   vnp_ReturnUrl: returnUrl,
    //   vnp_IpAddr: ipAddr,
    //   vnp_CreateDate: createDate,
    // };

    // // Sắp xếp các tham số theo thứ tự alphabet và mã hóa chúng
    // const signData = qs.stringify(vnp_Params, { encode: false, sort: (a, b) => a.localeCompare(b) });
    // const hmac = crypto.createHmac('sha512', secretKey);
    // const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    // vnp_Params['vnp_SecureHash'] = signed;

    // vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false, sort: (a, b) => a.localeCompare(b) });
    // return vnpUrl;
    // ensure required env vars exist and are strings
        const tmnCode = process.env.VNPAY_TMN_CODE;
        if (!tmnCode) return errorResponse(500, 'VNPAY_TMN_CODE not configured', 'CONFIG_ERROR');

        const secureSecret = process.env.VNPAY_HASH_SECRET ?? "1FZ06FKB0JF1Q80XB8F83P3S9SCZVWOE";
        const vnpayReturn = process.env.VNPAY_RETURN_URL ?? "http://localhost:8000/api/v1/payment/vnpay-return";

        const vnpay = new VNPay({
            tmnCode: tmnCode, // Mã TMN sandbox
            secureSecret: secureSecret, // Secret Key
            vnpayHost: "https://sandbox.vnpayment.vn",
            testMode: true,
            hashAlgorithm: HashAlgorithm.SHA512,
            loggerFn: ignoreLogger,
        });
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);


        const expireTime = new Date(Date.now() + 15 * 60 * 1000);

        const vnpayResponse = await vnpay.buildPaymentUrl({
            vnp_Amount: payment.amount,
            vnp_IpAddr: "127.0.0.1",
            vnp_TxnRef: payment.id.toString(),
            vnp_OrderInfo: `Payment for transaction ${payment.id}`,
            vnp_OrderType: ProductCode.Other,
            vnp_ReturnUrl: vnpayReturn,
            vnp_Locale: VnpLocale.VN,
            vnp_CreateDate: dateFormat(new Date()),
            vnp_ExpireDate: dateFormat(expireTime),           
        });
        return successResponse(200, 'VnPay payment URL created', vnpayResponse);
  }



  async handleVnpayReturn(query: VnpayQueryDto, paymentId: number): Promise<any> {
    const payment = await this.prisma.payment.findUnique({ where: { id: paymentId } });
        if (!payment) return errorResponse(400, 'Transaction not found');       

        if (query.vnp_ResponseCode === '00') {
          console.log("Thành công");

            await this.prisma.payment.update({
                where: { id: paymentId },
                data: { status: 'SUCCESS' },
            });
            await this.prisma.order.update({
                where: { id:payment.orderID  },
                data: { status: 'CONFIRMED' },
            });
            
            return successResponse(200, 'Payment success, money in escrow');
        } else {
            await this.prisma.payment.update({
                where: { id: paymentId },
                data: { status: 'FAILED' },
            });
            await this.prisma.order.update({
                where: { id:payment.orderID  },
                data: { status: 'CANCELLED' },
            });
            return errorResponse(400, 'Payment failed');
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
