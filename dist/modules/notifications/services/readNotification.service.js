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
exports.ReadNotificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const response_util_1 = require("../../../common/utils/response.util");
const notification_repository_1 = require("../repository/notification.repository");
let ReadNotificationService = class ReadNotificationService {
    prisma;
    repository;
    constructor(prisma, repository) {
        this.prisma = prisma;
        this.repository = repository;
    }
    async readNotification(notificationID, user) {
        try {
            const userID = user.id;
            const checkNoti = await this.repository.findNotificationByID(notificationID);
            if (!checkNoti) {
                return (0, response_util_1.errorResponse)(400, 'Thông báo không tồn tại', 'NOTI_NOT_FOUND');
            }
            if (checkNoti.receiverID !== userID) {
                return (0, response_util_1.errorResponse)(400, 'Thông báo không phải của bạn', 'NOTI_PERMISSION_NOTI');
            }
            this.repository.updateIsReadNotification(notificationID);
            return (0, response_util_1.successResponse)(200, 'Đánh dấu đã xem thông báo thành công');
        }
        catch (error) {
            console.log(error);
            return (0, response_util_1.errorResponse)(400, error, 'Đánh dấu đã xem thông báo không thành công');
        }
    }
};
exports.ReadNotificationService = ReadNotificationService;
exports.ReadNotificationService = ReadNotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_repository_1.NotificationRepository])
], ReadNotificationService);
//# sourceMappingURL=readNotification.service.js.map