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
exports.AddImageProductController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../configs/app.routes");
const app_permission_1 = require("../../../configs/app.permission");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const platform_express_1 = require("@nestjs/platform-express");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/guards/roles.decorator");
const get_user_decorator_1 = require("../../auth/guards/get-user.decorator");
const add_new_image_product_service_1 = require("../services/add-new-image-product.service");
const response_util_1 = require("../../../common/utils/response.util");
let AddImageProductController = class AddImageProductController {
    AddImageProductService;
    constructor(AddImageProductService) {
        this.AddImageProductService = AddImageProductService;
    }
    async createProduct(id, files, user, req) {
        const contentType = req.headers['content-type'] || '';
        if (!contentType.includes('multipart/form-data')) {
            return (0, response_util_1.errorResponse)(400, 'Yêu cầu này cần có Content-Type: multipart/form-data. Vui lòng gửi file đúng định dạng.');
        }
        return await this.AddImageProductService.addImage(+id, files, user);
    }
};
exports.AddImageProductController = AddImageProductController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: app_permission_1.resourcesV1.ADD_IMAGE_PRODUCT.displayName }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(4),
    (0, common_1.Post)(app_routes_1.routesV1.product.addNewImage),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'images', maxCount: 10 }])),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                images: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                    description: 'Danh sách ảnh cần upload',
                },
            },
            required: ['images']
        },
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của sản phẩm' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AddImageProductController.prototype, "createProduct", null);
exports.AddImageProductController = AddImageProductController = __decorate([
    (0, swagger_1.ApiTags)(`${app_permission_1.resourcesV1.ADD_IMAGE_PRODUCT.parent}`),
    (0, common_1.Controller)(app_routes_1.routesV1.apiversion),
    __metadata("design:paramtypes", [add_new_image_product_service_1.AddImageProductService])
], AddImageProductController);
//# sourceMappingURL=add-new-image-product.controller.js.map