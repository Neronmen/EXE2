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
exports.CreateCategoryShopController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../configs/app.routes");
const app_permission_1 = require("../../../configs/app.permission");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const get_user_decorator_1 = require("../../auth/guards/get-user.decorator");
const roles_decorator_1 = require("../../auth/guards/roles.decorator");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const category_shop_dto_1 = require("../dtos/category-shop.dto");
const create_category_shop_service_1 = require("../services/create-category-shop.service");
const platform_express_1 = require("@nestjs/platform-express");
let CreateCategoryShopController = class CreateCategoryShopController {
    createCategoryShopService;
    constructor(createCategoryShopService) {
        this.createCategoryShopService = createCategoryShopService;
    }
    async createCategoryShop(files, dto, user) {
        return this.createCategoryShopService.createCategoryShop(files, dto, user);
    }
};
exports.CreateCategoryShopController = CreateCategoryShopController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: app_permission_1.resourcesV1.CREATE_CATEGORY_SHOP.displayName }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: "image", maxCount: 1 },
    ])),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                name: { type: "string", example: "Rau hữu cơ" },
                description: { type: "string", example: "Các loại rau trồng hữu cơ" },
                categoryGlobalId: { type: "number", format: "number", example: 1 },
                image: { type: "string", format: "binary" },
            },
            required: ['name',],
        },
    }),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(4),
    (0, common_1.Post)(app_routes_1.routesV1.categoryShop.root),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, category_shop_dto_1.CreateCategoryShopDto, Object]),
    __metadata("design:returntype", Promise)
], CreateCategoryShopController.prototype, "createCategoryShop", null);
exports.CreateCategoryShopController = CreateCategoryShopController = __decorate([
    (0, swagger_1.ApiTags)(`${app_permission_1.resourcesV1.CREATE_CATEGORY_SHOP.parent}`),
    (0, common_1.Controller)(app_routes_1.routesV1.apiversion),
    __metadata("design:paramtypes", [create_category_shop_service_1.CreateCategoryShopService])
], CreateCategoryShopController);
//# sourceMappingURL=create-category-shop.controller.js.map