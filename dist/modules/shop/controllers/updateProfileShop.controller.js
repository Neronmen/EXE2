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
exports.UpdateShopController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../configs/app.routes");
const app_permission_1 = require("../../../configs/app.permission");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const get_user_decorator_1 = require("../../auth/guards/get-user.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/guards/roles.decorator");
const resubmit_seller_dto_1 = require("../../seller/dtos/resubmit-seller.dto");
const updateProfileShop_service_1 = require("../services/updateProfileShop.service");
let UpdateShopController = class UpdateShopController {
    UpdateProfileShopService;
    constructor(UpdateProfileShopService) {
        this.UpdateProfileShopService = UpdateProfileShopService;
    }
    async resubmitSeller(dto, files, user) {
        return await this.UpdateProfileShopService.updateProfileShop(dto, files, user);
    }
};
exports.UpdateShopController = UpdateShopController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: app_permission_1.resourcesV1.UPDATE_PROFILE_SHOP.displayName }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(4),
    (0, common_1.Patch)(app_routes_1.routesV1.shop.root),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'shopAvatar', maxCount: 1 },
        { name: 'shopBanner', maxCount: 1 },
    ])),
    (0, swagger_1.ApiBody)({
        description: 'Cập nhật lại hồ sơ shop (tất cả trường đều optional — chỉ cập nhật những gì cần)',
        schema: {
            type: 'object',
            properties: {
                companyName: { type: 'string', example: 'Công ty ABC (cập nhật)' },
                brandName: { type: 'string', example: 'ABC Food (cập nhật)' },
                businessPhone: { type: 'string', example: '0905123456' },
                businessAddress: { type: 'string', example: '123 Nguyễn Văn Linh, Đà Nẵng' },
                description: { type: 'string', example: 'Cập nhật mô tả' },
                shopAvatar: { type: 'string', format: 'binary' },
                shopBanner: { type: 'string', format: 'binary' },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resubmit_seller_dto_1.ResubmitSellerDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UpdateShopController.prototype, "resubmitSeller", null);
exports.UpdateShopController = UpdateShopController = __decorate([
    (0, swagger_1.ApiTags)(`${app_permission_1.resourcesV1.UPDATE_PROFILE_SHOP.parent}`),
    (0, common_1.Controller)(app_routes_1.routesV1.apiversion),
    __metadata("design:paramtypes", [updateProfileShop_service_1.UpdateProfileShopService])
], UpdateShopController);
//# sourceMappingURL=updateProfileShop.controller.js.map