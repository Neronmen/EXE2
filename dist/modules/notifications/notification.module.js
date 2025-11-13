"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../libs/prisma/prisma.module");
const jwt_1 = require("@nestjs/jwt");
const createNotification_controller_1 = require("./controllers/createNotification.controller");
const createNotification_service_1 = require("./services/createNotification.service");
const notification_gateway_1 = require("./gateway/notification.gateway");
const auth_repository_1 = require("../auth/repositories/auth.repository");
const getUserNotification_service_1 = require("./services/getUserNotification.service");
const getUserNotification_controller_1 = require("./controllers/getUserNotification.controller");
const notification_repository_1 = require("./repository/notification.repository");
const readNotification_service_1 = require("./services/readNotification.service");
const readNotification_controller_1 = require("./controllers/readNotification.controller");
const readAllNotification_controller_1 = require("./controllers/readAllNotification.controller");
const readAllNotication_service_1 = require("./services/readAllNotication.service");
const httpController = [
    createNotification_controller_1.CreateNotificationController,
    getUserNotification_controller_1.GetUserNotificationController,
    readNotification_controller_1.ReadNotificationController,
    readAllNotification_controller_1.ReadAllNotificationController
];
const Repository = [
    notification_repository_1.NotificationRepository
];
const Services = [
    createNotification_service_1.CreateNotificationService,
    getUserNotification_service_1.GetUserNotificationService,
    readNotification_service_1.ReadNotificationService,
    readAllNotication_service_1.ReadAllNotificationService,
    jwt_1.JwtService
];
let NotificationModule = class NotificationModule {
};
exports.NotificationModule = NotificationModule;
exports.NotificationModule = NotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [...httpController],
        providers: [...Services, ...Repository, notification_gateway_1.NotificationGateway, auth_repository_1.AuthRepository],
    })
], NotificationModule);
//# sourceMappingURL=notification.module.js.map