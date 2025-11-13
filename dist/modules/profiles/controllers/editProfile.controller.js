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
exports.EditProfileController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../configs/app.routes");
const app_permission_1 = require("../../../configs/app.permission");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const get_user_decorator_1 = require("../../auth/guards/get-user.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const editProfile_dto_1 = require("../dtos/editProfile.dto");
const editProfile_service_1 = require("../services/editProfile.service");
let EditProfileController = class EditProfileController {
    editProfileService;
    constructor(editProfileService) {
        this.editProfileService = editProfileService;
    }
    async editProfile(files, dto, user) {
        return await this.editProfileService.editProfile(files, dto, user);
    }
};
exports.EditProfileController = EditProfileController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: app_permission_1.resourcesV1.EDIT_PROFILE.displayName }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: "avatar", maxCount: 1 },
    ])),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                name: { type: "string" },
                phone: { type: "string" },
                avatar: { type: "string", format: "binary" },
            },
        },
    }),
    (0, common_1.Patch)(app_routes_1.routesV1.profile.root),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, editProfile_dto_1.EditProfileDto, Object]),
    __metadata("design:returntype", Promise)
], EditProfileController.prototype, "editProfile", null);
exports.EditProfileController = EditProfileController = __decorate([
    (0, swagger_1.ApiTags)(`${app_permission_1.resourcesV1.EDIT_PROFILE.parent}`),
    (0, common_1.Controller)(app_routes_1.routesV1.apiversion),
    __metadata("design:paramtypes", [editProfile_service_1.EditProfileService])
], EditProfileController);
//# sourceMappingURL=editProfile.controller.js.map