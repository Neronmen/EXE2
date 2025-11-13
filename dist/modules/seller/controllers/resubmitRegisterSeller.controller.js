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
exports.ResubmitRegisterSellerController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../configs/app.routes");
const app_permission_1 = require("../../../configs/app.permission");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const get_user_decorator_1 = require("../../auth/guards/get-user.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/guards/roles.decorator");
const resubmit_seller_dto_1 = require("../dtos/resubmit-seller.dto");
const resubmitRegisterSeller_service_1 = require("../services/resubmitRegisterSeller.service");
let ResubmitRegisterSellerController = class ResubmitRegisterSellerController {
    ResubmitRegisterSellerService;
    constructor(ResubmitRegisterSellerService) {
        this.ResubmitRegisterSellerService = ResubmitRegisterSellerService;
    }
    async resubmitSeller(dto, files, user) {
        return await this.ResubmitRegisterSellerService.resubmitSeller(dto, files, user);
    }
};
exports.ResubmitRegisterSellerController = ResubmitRegisterSellerController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: app_permission_1.resourcesV1.RESUBMIT_REGISTER_SELLER.displayName }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(6),
    (0, common_1.Patch)(app_routes_1.routesV1.seller.resubmitRegisterSeller),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'idCardFront', maxCount: 1 },
        { name: 'idCardBack', maxCount: 1 },
        { name: 'businessLicense', maxCount: 1 },
        { name: 'foodSafetyCert', maxCount: 1 },
    ])),
    (0, swagger_1.ApiBody)({
        description: 'Gửi lại hồ sơ seller (tất cả trường đều optional — chỉ cập nhật những gì cần)',
        schema: {
            type: 'object',
            properties: {
                companyName: { type: 'string', example: 'Công ty ABC (cập nhật)' },
                brandName: { type: 'string', example: 'ABC Food (cập nhật)' },
                businessPhone: { type: 'string', example: '0905123456' },
                businessAddress: { type: 'string', example: '123 Nguyễn Văn Linh, Đà Nẵng' },
                description: { type: 'string', example: 'Cập nhật mô tả' },
                idCardFront: { type: 'string', format: 'binary' },
                idCardBack: { type: 'string', format: 'binary' },
                businessLicense: { type: 'string', format: 'binary' },
                foodSafetyCert: { type: 'string', format: 'binary' },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resubmit_seller_dto_1.ResubmitSellerDto, Object, Object]),
    __metadata("design:returntype", Promise)
], ResubmitRegisterSellerController.prototype, "resubmitSeller", null);
exports.ResubmitRegisterSellerController = ResubmitRegisterSellerController = __decorate([
    (0, swagger_1.ApiTags)(`${app_permission_1.resourcesV1.RESUBMIT_REGISTER_SELLER.parent}`),
    (0, common_1.Controller)(app_routes_1.routesV1.apiversion),
    __metadata("design:paramtypes", [resubmitRegisterSeller_service_1.ResubmitRegisterSellerService])
], ResubmitRegisterSellerController);
//# sourceMappingURL=resubmitRegisterSeller.controller.js.map