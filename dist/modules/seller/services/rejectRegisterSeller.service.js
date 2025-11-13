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
exports.RejectRegisterSellerService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const notification_gateway_1 = require("../../notifications/gateway/notification.gateway");
let RejectRegisterSellerService = class RejectRegisterSellerService {
    prisma;
    gateway;
    constructor(prisma, gateway) {
        this.prisma = prisma;
        this.gateway = gateway;
    }
    async rejectRegister(sellerID, dto) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { id: sellerID },
        });
        if (!seller) {
            return (0, response_util_1.errorResponse)(400, `Không tìm thấy đơn đăng ký nào có ID này ${sellerID}`);
        }
        if (seller.status !== 'PENDING') {
            return (0, response_util_1.errorResponse)(400, `Không thể từ chối đơn đăng ký với trạng thái ${seller.status}`);
        }
        const updateData = {
            status: "REJECTED"
        };
        if (dto.rejectionReason) {
            updateData.rejectionReason = dto.rejectionReason;
        }
        const notificationData = {
            title: 'Đơn đăng ký nhà bán hàng đã bị từ chối',
            content: `Tài khoản người bán "${seller.companyName}" của bạn không được phê duyệt.`,
            type: client_1.NotificationType.REGISTER_SELLER,
            senderType: client_1.SenderType.SYSTEM,
            receiverID: seller.userID,
            metadata: {
                sellerID: seller.id,
            },
            senderID: null,
            isRead: false,
        };
        await this.prisma.notification.create({ data: notificationData });
        this.gateway.sendToUser(seller.userID, {
            title: 'Đơn đăng ký nhà bán hàng đã bị từ chối',
            content: `Tài khoản người bán "${seller.companyName}" của bạn không được phê duyệt.`,
            type: client_1.NotificationType.REGISTER_SELLER,
            senderType: client_1.SenderType.SYSTEM,
            isRead: false,
            createdAt: new Date(),
            metadata: {
                sellerID: seller.id,
            }
        });
        return (0, response_util_1.successResponse)(200, 'Từ chối đơn đăng ký thành công');
    }
};
exports.RejectRegisterSellerService = RejectRegisterSellerService;
exports.RejectRegisterSellerService = RejectRegisterSellerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_gateway_1.NotificationGateway])
], RejectRegisterSellerService);
//# sourceMappingURL=rejectRegisterSeller.service.js.map