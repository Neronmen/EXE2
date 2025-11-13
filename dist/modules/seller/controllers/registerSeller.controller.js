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
exports.RegisterSellerController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../configs/app.routes");
const app_permission_1 = require("../../../configs/app.permission");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const get_user_decorator_1 = require("../../auth/guards/get-user.decorator");
const registerSeller_service_1 = require("../services/registerSeller.service");
const platform_express_1 = require("@nestjs/platform-express");
const register_seller_dto_1 = require("../dtos/register-seller.dto");
const permissions_guard_1 = require("../../auth/guards/permissions.guard");
const permission_decorator_1 = require("../../auth/guards/permission.decorator");
let RegisterSellerController = class RegisterSellerController {
    registerSellerService;
    constructor(registerSellerService) {
        this.registerSellerService = registerSellerService;
    }
    async registerSeller(dto, files, user) {
        if (!files.idCardFront?.[0] ||
            !files.idCardBack?.[0] ||
            !files.businessLicense?.[0] ||
            !files.foodSafetyCert?.[0]) {
            throw new Error('Thiếu file bắt buộc');
        }
        return await this.registerSellerService.registerSeller(dto, files, user);
    }
};
exports.RegisterSellerController = RegisterSellerController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: app_permission_1.resourcesV1.REGISTER_SELLER.displayName }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard, permissions_guard_1.PermissionGuard),
    (0, permission_decorator_1.Permissions)("USER_REGISTER_SELLER"),
    (0, common_1.Post)(app_routes_1.routesV1.seller.registerSeller),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'idCardFront', maxCount: 1 },
        { name: 'idCardBack', maxCount: 1 },
        { name: 'businessLicense', maxCount: 1 },
        { name: 'foodSafetyCert', maxCount: 1 },
    ])),
    (0, swagger_1.ApiBody)({
        description: 'Đăng ký seller (tất cả trường và file đều bắt buộc)',
        schema: {
            type: 'object',
            properties: {
                companyName: { type: 'string', example: 'Công ty ABC' },
                brandName: { type: 'string', example: 'ABC Food' },
                businessPhone: { type: 'string', example: '0905123456' },
                businessAddress: { type: 'string', example: '123 Nguyễn Văn Linh, Đà Nẵng' },
                description: { type: 'string', example: 'Chuyên phân phối thực phẩm sạch' },
                idCardFront: { type: 'string', format: 'binary' },
                idCardBack: { type: 'string', format: 'binary' },
                businessLicense: { type: 'string', format: 'binary' },
                foodSafetyCert: { type: 'string', format: 'binary' },
            },
            required: [
                'companyName',
                'brandName',
                'businessPhone',
                'businessAddress',
                'description',
                'idCardFront',
                'idCardBack',
                'businessLicense',
                'foodSafetyCert',
            ],
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_seller_dto_1.RegisterSellerDto, Object, Object]),
    __metadata("design:returntype", Promise)
], RegisterSellerController.prototype, "registerSeller", null);
exports.RegisterSellerController = RegisterSellerController = __decorate([
    (0, swagger_1.ApiTags)(`${app_permission_1.resourcesV1.REGISTER_SELLER.parent}`),
    (0, common_1.Controller)(app_routes_1.routesV1.apiversion),
    __metadata("design:paramtypes", [registerSeller_service_1.RegisterSellerService])
], RegisterSellerController);
//# sourceMappingURL=registerSeller.controller.js.map