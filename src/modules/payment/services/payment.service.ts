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
  ) { }

  async createVnpayUrl(orderId: number, ipAddr: string, req: any) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return errorResponse(400, 'Order not found', 'NOT_FOUND');
    }

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

    const tmnCode = process.env.VNPAY_TMN_CODE;
    if (!tmnCode) return errorResponse(500, 'VNPAY_TMN_CODE not configured', 'CONFIG_ERROR');

    const secureSecret = process.env.VNPAY_HASH_SECRET ?? "1FZ06FKB0JF1Q80XB8F83P3S9SCZVWOE";
    console.log(process.env.VNPAY_RETURN_URL)
    const vnpayReturn = process.env.VNPAY_RETURN_URL ?? "https://exe2-production.up.railway.app/api/v1/payment/vnpay-return";

    // Hàm chuyển sang giờ VN
    const toVNTime = (date: Date) => new Date(date.getTime() + 7 * 60 * 60 * 1000);

    // Format chuẩn yyyyMMddHHmmss
    const dateFormat = (date: Date) => {
      const yyyy = date.getFullYear();
      const MM = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const HH = String(date.getHours()).padStart(2, "0");
      const mm = String(date.getMinutes()).padStart(2, "0");
      const ss = String(date.getSeconds()).padStart(2, "0");
      return `${yyyy}${MM}${dd}${HH}${mm}${ss}`;
    };

    const nowVN = toVNTime(new Date());
    const expireVN = new Date(nowVN.getTime() + 15 * 60 * 1000); // +15 phút

    const vnpay = new VNPay({
      tmnCode,
      secureSecret,
      vnpayHost: "https://sandbox.vnpayment.vn",
      testMode: true,
      hashAlgorithm: HashAlgorithm.SHA512,
      loggerFn: ignoreLogger,
    });

    const vnpayResponse = await vnpay.buildPaymentUrl({
      vnp_Amount: payment.amount,
      vnp_IpAddr: ipAddr || req.ip,
      vnp_TxnRef: `${payment.id}`,
      vnp_OrderInfo: `Payment for transaction ${payment.id}`,
      vnp_OrderType: ProductCode.Other,
      vnp_ReturnUrl: vnpayReturn,
      vnp_Locale: VnpLocale.VN,
      vnp_CreateDate: Number(dateFormat(nowVN)),
      vnp_ExpireDate: Number(dateFormat(expireVN)),
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
        where: { id: payment.orderID },
        data: { status: 'CONFIRMED' },
      });

      return successResponse(200, 'Payment success, money in escrow');
    } else {
      await this.prisma.payment.update({
        where: { id: paymentId },
        data: { status: 'FAILED' },
      });
      const order = await this.prisma.order.update({
        where: { id: payment.orderID },
        data: { status: 'CANCELLED' },
        include: { items: true },
      });
      if (order.status === "CANCELLED") {
        for (const item of order.items) {
          await this.prisma.product.update({
            where: { id: item.productID },
            data: { stock: { increment: item.quantity } },
          });
        }
      }
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
