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
exports.CreateNotificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const notification_gateway_1 = require("../gateway/notification.gateway");
const response_util_1 = require("../../../common/utils/response.util");
const notification_repository_1 = require("../repository/notification.repository");
const client_1 = require("@prisma/client");
let CreateNotificationService = class CreateNotificationService {
    prisma;
    gateway;
    repository;
    constructor(prisma, gateway, repository) {
        this.prisma = prisma;
        this.gateway = gateway;
        this.repository = repository;
    }
    async createNotification(data, user) {
        let userIDs = data.userIDs;
        if (!userIDs || userIDs.length === 0) {
            let allUsers = await this.prisma.user.findMany({
                select: { id: true },
            });
            allUsers = allUsers.filter(u => u.id !== user.id);
            userIDs = allUsers.map(u => u.id);
        }
        const notificationsData = userIDs.map(userId => ({
            title: data.title,
            content: data.content,
            type: client_1.NotificationType.SYSTEM,
            senderType: client_1.SenderType.SYSTEM,
            receiverID: userId,
            senderID: user?.id ?? null,
        }));
        await this.prisma.notification.createMany({
            data: notificationsData,
        });
        for (const userId of userIDs) {
            this.gateway.sendToUser(userId, {
                title: data.title,
                content: data.content,
                type: client_1.NotificationType.SYSTEM,
                senderType: client_1.SenderType.SYSTEM,
                isRead: false,
                createdAt: new Date(),
            });
        }
        return (0, response_util_1.successResponse)(200, 'Gửi thông báo thành công');
    }
};
exports.CreateNotificationService = CreateNotificationService;
exports.CreateNotificationService = CreateNotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_gateway_1.NotificationGateway,
        notification_repository_1.NotificationRepository])
], CreateNotificationService);
//# sourceMappingURL=createNotification.service.js.map