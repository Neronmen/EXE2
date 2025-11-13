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
exports.CreateCommentController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../configs/app.routes");
const app_permission_1 = require("../../../configs/app.permission");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const get_user_decorator_1 = require("../../auth/guards/get-user.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const create_product_comment_dto_1 = require("../dtos/create-product-comment.dto");
const create_comment_product_service_1 = require("../services/create-comment-product.service");
let CreateCommentController = class CreateCommentController {
    createCommentService;
    constructor(createCommentService) {
        this.createCommentService = createCommentService;
    }
    async createShopReview(productId, dto, files, user) {
        return await this.createCommentService.createComment(+productId, dto, Number(user.id), files);
    }
};
exports.CreateCommentController = CreateCommentController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: app_permission_1.resourcesV1.CREATE_COMMENT_PRODUCT.displayName }),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'images', maxCount: 5 }])),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                content: { type: 'string' },
                images: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                },
            },
        },
    }),
    (0, common_1.Post)(app_routes_1.routesV1.comment.getOne),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __param(3, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_product_comment_dto_1.CreateProductCommentDto, Object, Object]),
    __metadata("design:returntype", Promise)
], CreateCommentController.prototype, "createShopReview", null);
exports.CreateCommentController = CreateCommentController = __decorate([
    (0, swagger_1.ApiTags)(`${app_permission_1.resourcesV1.CREATE_COMMENT_PRODUCT.parent}`),
    (0, common_1.Controller)(app_routes_1.routesV1.apiversion),
    __metadata("design:paramtypes", [create_comment_product_service_1.CreateProductCommentService])
], CreateCommentController);
//# sourceMappingURL=create-comment-product.controller.js.map