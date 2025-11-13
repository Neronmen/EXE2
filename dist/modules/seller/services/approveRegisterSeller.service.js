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
exports.ApproveRegisterSellerService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const notification_gateway_1 = require("../../notifications/gateway/notification.gateway");
let ApproveRegisterSellerService = class ApproveRegisterSellerService {
    prisma;
    gateway;
    constructor(prisma, gateway) {
        this.prisma = prisma;
        this.gateway = gateway;
    }
    async approveRegister(sellerID) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { id: sellerID },
        });
        if (!seller) {
            return (0, response_util_1.errorResponse)(400, `Không tìm thấy đơn đăng ký nào có ID này ${sellerID}`);
        }
        if (seller.status !== 'PENDING') {
            return (0, response_util_1.errorResponse)(400, `Không thể duyệt đơn đăng ký với trạng thái ${seller.status}`);
        }
        const updatedSeller = await this.prisma.sellerProfile.update({
            where: { id: sellerID },
            data: { status: 'APPROVED' },
        });
        await this.prisma.user.update({
            where: {
                id: seller.userID
            },
            data: {
                roleID: 4
            }
        });
        const notificationData = {
            title: 'Đơn đăng ký nhà bán hàng đã được phê duyệt',
            content: `Tài khoản người bán "${seller.companyName}" của bạn đã được phê duyệt.`,
            type: client_1.NotificationType.REGISTER_SELLER,
            senderType: client_1.SenderType.SYSTEM,
            receiverID: seller.userID,
            senderID: null,
            isRead: false,
            metadata: {
                sellerID: seller.id,
            }
        };
        await this.prisma.notification.create({ data: notificationData });
        this.gateway.sendToUser(seller.userID, {
            title: 'Đơn đăng ký nhà bán hàng đã được phê duyệt',
            content: `Tài khoản người bán "${seller.companyName}" của bạn đã được phê duyệt.`,
            isRead: false,
            type: client_1.NotificationType.REGISTER_SELLER,
            senderType: client_1.SenderType.SYSTEM,
            newRoleID: 4,
            metadata: {
                sellerID: seller.id,
            },
            createdAt: new Date(),
        });
        return (0, response_util_1.successResponse)(200, 'Duyệt đơn đăng ký thành công');
    }
};
exports.ApproveRegisterSellerService = ApproveRegisterSellerService;
exports.ApproveRegisterSellerService = ApproveRegisterSellerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_gateway_1.NotificationGateway])
], ApproveRegisterSellerService);
//# sourceMappingURL=approveRegisterSeller.service.js.map