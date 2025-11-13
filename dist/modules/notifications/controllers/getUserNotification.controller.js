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
exports.GetUserNotificationController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../configs/app.routes");
const app_permission_1 = require("../../../configs/app.permission");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const getUserNotification_service_1 = require("../services/getUserNotification.service");
const getUserNotification_dto_1 = require("../dtos/getUserNotification.dto");
let GetUserNotificationController = class GetUserNotificationController {
    getUserNotificationService;
    constructor(getUserNotificationService) {
        this.getUserNotificationService = getUserNotificationService;
    }
    async getUserNotification(userID, query) {
        return await this.getUserNotificationService.getUserNotifications(Number(userID), query.skip, query.take);
    }
};
exports.GetUserNotificationController = GetUserNotificationController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: app_permission_1.resourcesV1.GET_USER_NOTIFICATION.displayName }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard),
    (0, common_1.Get)(app_routes_1.routesV1.notification.getUserNotifications),
    __param(0, (0, common_1.Param)('userID')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, getUserNotification_dto_1.GetUserNotificationQueryDto]),
    __metadata("design:returntype", Promise)
], GetUserNotificationController.prototype, "getUserNotification", null);
exports.GetUserNotificationController = GetUserNotificationController = __decorate([
    (0, swagger_1.ApiTags)(`${app_permission_1.resourcesV1.GET_USER_NOTIFICATION.parent}`),
    (0, common_1.Controller)(app_routes_1.routesV1.apiversion),
    __metadata("design:paramtypes", [getUserNotification_service_1.GetUserNotificationService])
], GetUserNotificationController);
//# sourceMappingURL=getUserNotification.controller.js.map