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
exports.CreateProductController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../configs/app.routes");
const app_permission_1 = require("../../../configs/app.permission");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const get_user_decorator_1 = require("../../auth/guards/get-user.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/guards/roles.decorator");
const create_product_dto_1 = require("../dtos/create-product.dto");
const create_product_service_1 = require("../services/create-product.service");
const response_util_1 = require("../../../common/utils/response.util");
let CreateProductController = class CreateProductController {
    createProductService;
    constructor(createProductService) {
        this.createProductService = createProductService;
    }
    async createProduct(dto, files, user, req) {
        const contentType = req.headers['content-type'] || '';
        if (!contentType.includes('multipart/form-data')) {
            return (0, response_util_1.errorResponse)(400, 'Yêu cầu này cần có Content-Type: multipart/form-data. Vui lòng gửi file đúng định dạng.');
        }
        return this.createProductService.create(dto, files.images, user);
    }
};
exports.CreateProductController = CreateProductController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: app_permission_1.resourcesV1.CREATE_PRODUCT.displayName }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(4),
    (0, common_1.Post)(app_routes_1.routesV1.product.createProduct),
    (0, swagger_1.ApiBody)({ type: create_product_dto_1.CreateProductDto }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'images', maxCount: 10 }])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CreateProductController.prototype, "createProduct", null);
exports.CreateProductController = CreateProductController = __decorate([
    (0, swagger_1.ApiTags)(`${app_permission_1.resourcesV1.CREATE_PRODUCT.parent}`),
    (0, common_1.Controller)(app_routes_1.routesV1.apiversion),
    __metadata("design:paramtypes", [create_product_service_1.CreateProductService])
], CreateProductController);
//# sourceMappingURL=create-product.controller.js.map