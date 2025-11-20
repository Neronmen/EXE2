"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const response_util_1 = require("../../../common/utils/response.util");
const vnpay_1 = require("vnpay");
let PaymentService = class PaymentService {
    prisma;
    configService;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    async createVnpayUrl(orderId, ipAddr, req) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
        });
        if (!order) {
            return (0, response_util_1.errorResponse)(400, 'Order not found', 'NOT_FOUND');
        }
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
        if (!tmnCode)
            return (0, response_util_1.errorResponse)(500, 'VNPAY_TMN_CODE not configured', 'CONFIG_ERROR');
        const secureSecret = process.env.VNPAY_HASH_SECRET ?? "1FZ06FKB0JF1Q80XB8F83P3S9SCZVWOE";
        const vnpayReturn = process.env.VNPAY_RETURN_URL ?? "https://exe2-production.up.railway.app/api/v1/payment/vnpay-return";
        const vnpay = new vnpay_1.VNPay({
            tmnCode: tmnCode,
            secureSecret: secureSecret,
            vnpayHost: "https://sandbox.vnpayment.vn",
            testMode: true,
            hashAlgorithm: vnpay_1.HashAlgorithm.SHA512,
            loggerFn: vnpay_1.ignoreLogger,
        });
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const expireTime = new Date(Date.now() + 15 * 60 * 1000);
        const vnpayResponse = await vnpay.buildPaymentUrl({
            vnp_Amount: payment.amount,
            vnp_IpAddr: ipAddr || req.ip,
            vnp_TxnRef: payment.id.toString(),
            vnp_OrderInfo: `Payment for transaction ${payment.id}`,
            vnp_OrderType: vnpay_1.ProductCode.Other,
            vnp_ReturnUrl: vnpayReturn,
            vnp_Locale: vnpay_1.VnpLocale.VN,
            vnp_CreateDate: (0, vnpay_1.dateFormat)(new Date()),
            vnp_ExpireDate: (0, vnpay_1.dateFormat)(expireTime),
        });
        return (0, response_util_1.successResponse)(200, 'VnPay payment URL created', vnpayResponse);
    }
    async handleVnpayReturn(query, paymentId) {
        const payment = await this.prisma.payment.findUnique({ where: { id: paymentId } });
        if (!payment)
            return (0, response_util_1.errorResponse)(400, 'Transaction not found');
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
            return (0, response_util_1.successResponse)(200, 'Payment success, money in escrow');
        }
        else {
            await this.prisma.payment.update({
                where: { id: paymentId },
                data: { status: 'FAILED' },
            });
            await this.prisma.order.update({
                where: { id: payment.orderID },
                data: { status: 'CANCELLED' },
            });
            return (0, response_util_1.errorResponse)(400, 'Payment failed');
        }
    }
    formatDate(date) {
        const yyyy = date.getFullYear();
        const MM = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const HH = String(date.getHours()).padStart(2, '0');
        const mm = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');
        return `${yyyy}${MM}${dd}${HH}${mm}${ss}`;
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map