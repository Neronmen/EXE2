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
exports.NotificationRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let NotificationRepository = class NotificationRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSystemNotification(title, content) {
        return this.prisma.notification.create({
            data: { title, content },
        });
    }
    async createUserNotification(senderID, receiverID, title, content) {
        return this.prisma.notification.create({
            data: { senderID, receiverID, title, content },
        });
    }
    getUserNotification(userID, skip = 0, take = 20) {
        return this.prisma.notification.findMany({
            where: { receiverID: userID },
            orderBy: { createdAt: 'desc' },
            skip,
            take: take === -1 ? undefined : take,
            select: {
                id: true,
                title: true,
                content: true,
                type: true,
                senderType: true,
                metadata: true,
                isRead: true,
                createdAt: true,
                sender: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                        roleID: true,
                    }
                }
            }
        });
    }
    countUserNotification(userID) {
        return this.prisma.notification.count({
            where: { receiverID: userID },
        });
    }
    async findNotificationByID(id) {
        return await this.prisma.notification.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                receiverID: true
            }
        });
    }
    async findAllNotificationByUserID(userID) {
        return await this.prisma.notification.findMany({
            where: {
                receiverID: userID
            },
            select: {
                id: true,
                receiverID: true
            }
        });
    }
    async updateManyIsReadNotificationByUserID(userID) {
        await this.prisma.notification.updateMany({
            where: { receiverID: userID, isRead: false },
            data: { isRead: true }
        });
    }
    async updateIsReadNotification(notificationID) {
        await this.prisma.notification.update({
            where: { id: notificationID },
            data: {
                isRead: true
            }
        });
    }
};
exports.NotificationRepository = NotificationRepository;
exports.NotificationRepository = NotificationRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationRepository);
//# sourceMappingURL=notification.repository.js.map