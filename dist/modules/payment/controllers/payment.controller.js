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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("../services/payment.service");
const create_payment_dto_1 = require("../dtos/create-payment.dto");
const swagger_1 = require("@nestjs/swagger");
const vnpay_query_dto_1 = require("../dtos/vnpay-query.dto");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/guards/roles.decorator");
const get_user_decorator_1 = require("../../auth/guards/get-user.decorator");
const transaction_service_1 = require("../services/transaction.service");
const pagination_query_dto_1 = require("../dtos/pagination-query.dto");
const role_enum_1 = require("./role.enum");
let PaymentController = class PaymentController {
    paymentService;
    transactionService;
    constructor(paymentService, transactionService) {
        this.paymentService = paymentService;
        this.transactionService = transactionService;
    }
    async createVnpayUrl(createPaymentDto, req) {
        const ipAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        return this.paymentService.createVnpayUrl(createPaymentDto.orderId, ipAddr, req);
    }
    async vnpayReturn(query, req, res) {
        const transactionId = req.query.vnp_TxnRef;
        await this.paymentService.handleVnpayReturn(query, Number(transactionId));
        const FE_URL = process.env.FE_URL || 'http://localhost:3000';
        const queryParams = new URLSearchParams(req.query).toString();
        return res.redirect(`${FE_URL}/payment/return?${queryParams}`);
    }
    async getMyTransactions(user, query) {
        return this.transactionService.getMyTransactions(user, query.skip, query.take);
    }
    async getAllTransactions(query) {
        return this.transactionService.getAllTransactions(query.skip, query.take);
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Tạo URL thanh toán VNPAY' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard),
    (0, common_1.Post)('create-vnpay-url'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_dto_1.CreatePaymentDto, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createVnpayUrl", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Xử lý kết quả trả về từ VNPAY' }),
    (0, common_1.Get)('vnpay-return'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vnpay_query_dto_1.VnpayQueryDto, Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "vnpayReturn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Lấy lịch sử giao dịch của tôi' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard),
    (0, common_1.Get)('transactions/me'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getMyTransactions", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Lấy tất cả lịch sử giao dịch (Admin)' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Get)('transactions/all'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getAllTransactions", null);
exports.PaymentController = PaymentController = __decorate([
    (0, swagger_1.ApiTags)('Payment'),
    (0, common_1.Controller)('api/v1/payment'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService,
        transaction_service_1.TransactionService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map