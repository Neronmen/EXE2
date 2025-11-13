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
exports.ChangePassProfileController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../configs/app.routes");
const app_permission_1 = require("../../../configs/app.permission");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const get_user_decorator_1 = require("../../auth/guards/get-user.decorator");
const changePassProfile_dto_1 = require("../dtos/changePassProfile.dto");
const changePassProfile_service_1 = require("../services/changePassProfile.service");
let ChangePassProfileController = class ChangePassProfileController {
    changePassProfileService;
    constructor(changePassProfileService) {
        this.changePassProfileService = changePassProfileService;
    }
    async changePass(userID, data, user) {
        return await this.changePassProfileService.changePassProfile(Number(userID), data, user);
    }
};
exports.ChangePassProfileController = ChangePassProfileController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: app_permission_1.resourcesV1.CHANGE_PASSWORD_PROFILE.displayName }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard),
    (0, common_1.Patch)(app_routes_1.routesV1.profile.changePassProfile),
    __param(0, (0, common_1.Param)('userID')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, changePassProfile_dto_1.ChangePassProfileDto, Object]),
    __metadata("design:returntype", Promise)
], ChangePassProfileController.prototype, "changePass", null);
exports.ChangePassProfileController = ChangePassProfileController = __decorate([
    (0, swagger_1.ApiTags)(`${app_permission_1.resourcesV1.CHANGE_PASSWORD_PROFILE.parent}`),
    (0, common_1.Controller)(app_routes_1.routesV1.apiversion),
    __metadata("design:paramtypes", [changePassProfile_service_1.ChangePassProfileService])
], ChangePassProfileController);
//# sourceMappingURL=changePassProfile.controller.js.map