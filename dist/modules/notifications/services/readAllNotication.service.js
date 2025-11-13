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
exports.ReadAllNotificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const response_util_1 = require("../../../common/utils/response.util");
const notification_repository_1 = require("../repository/notification.repository");
let ReadAllNotificationService = class ReadAllNotificationService {
    prisma;
    repository;
    constructor(prisma, repository) {
        this.prisma = prisma;
        this.repository = repository;
    }
    async readAllNotification(user) {
        const userID = user.id;
        const notifications = await this.repository.findAllNotificationByUserID(userID);
        if (notifications.length === 0) {
            return (0, response_util_1.errorResponse)(400, 'Không có thông báo nào để đánh dấu đã đọc', 'NO_NOTIFICATIONS');
        }
        await this.repository.updateManyIsReadNotificationByUserID(userID);
        return (0, response_util_1.successResponse)(200, 'Đánh dấu đã xem tất cả thông báo thành công');
    }
};
exports.ReadAllNotificationService = ReadAllNotificationService;
exports.ReadAllNotificationService = ReadAllNotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_repository_1.NotificationRepository])
], ReadAllNotificationService);
//# sourceMappingURL=readAllNotication.service.js.map