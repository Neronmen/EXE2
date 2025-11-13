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
exports.UpdateCategoryShopController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../configs/app.routes");
const app_permission_1 = require("../../../configs/app.permission");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const roles_decorator_1 = require("../../auth/guards/roles.decorator");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const platform_express_1 = require("@nestjs/platform-express");
const category_shop_dto_1 = require("../dtos/category-shop.dto");
const update_category_shop_service_1 = require("../services/update-category-shop.service");
let UpdateCategoryShopController = class UpdateCategoryShopController {
    updateCategoryShopService;
    constructor(updateCategoryShopService) {
        this.updateCategoryShopService = updateCategoryShopService;
    }
    async updateCategoryShop(files, id, dto) {
        return this.updateCategoryShopService.UpdateCategoryShop(files, +id, dto);
    }
};
exports.UpdateCategoryShopController = UpdateCategoryShopController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: app_permission_1.resourcesV1.UPDATE_CATEGORY_SHOP.displayName }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: "image", maxCount: 1 },
    ])),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                name: { type: "string" },
                description: { type: "string" },
                categoryGlobalId: { type: "number", format: "number", example: 1 },
                image: { type: "string", format: "binary" },
            },
        },
    }),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(4),
    (0, common_1.Patch)(app_routes_1.routesV1.categoryShop.getOne),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, category_shop_dto_1.UpdateCategoryShopDto]),
    __metadata("design:returntype", Promise)
], UpdateCategoryShopController.prototype, "updateCategoryShop", null);
exports.UpdateCategoryShopController = UpdateCategoryShopController = __decorate([
    (0, swagger_1.ApiTags)(`${app_permission_1.resourcesV1.UPDATE_CATEGORY_SHOP.parent}`),
    (0, common_1.Controller)(app_routes_1.routesV1.apiversion),
    __metadata("design:paramtypes", [update_category_shop_service_1.UpdateCategoryShopService])
], UpdateCategoryShopController);
//# sourceMappingURL=update-category-shop.controller.js.map