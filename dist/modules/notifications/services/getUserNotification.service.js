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
exports.GetUserNotificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const notification_gateway_1 = require("../gateway/notification.gateway");
const response_util_1 = require("../../../common/utils/response.util");
const auth_repository_1 = require("../../auth/repositories/auth.repository");
const notification_repository_1 = require("../repository/notification.repository");
let GetUserNotificationService = class GetUserNotificationService {
    prisma;
    gateway;
    authRepo;
    notiRepo;
    constructor(prisma, gateway, authRepo, notiRepo) {
        this.prisma = prisma;
        this.gateway = gateway;
        this.authRepo = authRepo;
        this.notiRepo = notiRepo;
    }
    async getUserNotifications(userID, skip = 0, take = 20) {
        const userExist = await this.authRepo.findByID(userID);
        if (!userExist) {
            return (0, response_util_1.errorResponse)(400, 'UserID không tồn tại', 'USERID_NOT_FOUND');
        }
        const [notifications, total] = await this.prisma.$transaction([
            this.notiRepo.getUserNotification(userID, skip, take),
            this.notiRepo.countUserNotification(userID),
        ]);
        const data = {
            notifications: notifications,
            meta: {
                total,
                skip,
                take,
                hasMore: take === -1 ? false : skip + notifications.length < total,
            },
        };
        return (0, response_util_1.successResponse)(200, data, 'Lấy danh sách thông báo thành công ');
    }
};
exports.GetUserNotificationService = GetUserNotificationService;
exports.GetUserNotificationService = GetUserNotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_gateway_1.NotificationGateway,
        auth_repository_1.AuthRepository,
        notification_repository_1.NotificationRepository])
], GetUserNotificationService);
//# sourceMappingURL=getUserNotification.service.js.map