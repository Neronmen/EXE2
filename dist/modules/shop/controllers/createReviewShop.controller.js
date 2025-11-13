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
exports.CreateReviewShopController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../configs/app.routes");
const app_permission_1 = require("../../../configs/app.permission");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const get_user_decorator_1 = require("../../auth/guards/get-user.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const create_review_shop_dto_1 = require("../dtos/create-review-shop.dto");
const createReviewShop_service_1 = require("../services/createReviewShop.service");
let CreateReviewShopController = class CreateReviewShopController {
    CreateShopReviewService;
    constructor(CreateShopReviewService) {
        this.CreateShopReviewService = CreateShopReviewService;
    }
    async createShopReview(dto, files, user) {
        return this.CreateShopReviewService.createReview(dto, files, user);
    }
};
exports.CreateReviewShopController = CreateReviewShopController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: app_permission_1.resourcesV1.CREATE_REVIEW_SHOP.displayName }),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo đánh giá cho shop' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'images', maxCount: 5 }])),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                sellerID: { type: 'number' },
                rating: { type: 'number', minimum: 1, maximum: 5 },
                comment: { type: 'string' },
                images: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                },
            },
        },
    }),
    (0, common_1.Post)(app_routes_1.routesV1.shop.createReviewShop),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_review_shop_dto_1.CreateShopReviewDto, Object, Object]),
    __metadata("design:returntype", Promise)
], CreateReviewShopController.prototype, "createShopReview", null);
exports.CreateReviewShopController = CreateReviewShopController = __decorate([
    (0, swagger_1.ApiTags)(`${app_permission_1.resourcesV1.CREATE_REVIEW_SHOP.parent}`),
    (0, common_1.Controller)(app_routes_1.routesV1.apiversion),
    __metadata("design:paramtypes", [createReviewShop_service_1.CreateShopReviewService])
], CreateReviewShopController);
//# sourceMappingURL=createReviewShop.controller.js.map