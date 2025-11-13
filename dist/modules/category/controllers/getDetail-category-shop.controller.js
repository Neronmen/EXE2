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
exports.GetDetailCategoryShopController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../configs/app.routes");
const app_permission_1 = require("../../../configs/app.permission");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const roles_decorator_1 = require("../../auth/guards/roles.decorator");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const get_user_decorator_1 = require("../../auth/guards/get-user.decorator");
const getDetail_category_shop_service_1 = require("../services/getDetail-category-shop.service");
let GetDetailCategoryShopController = class GetDetailCategoryShopController {
    getDetailCategoryShopService;
    constructor(getDetailCategoryShopService) {
        this.getDetailCategoryShopService = getDetailCategoryShopService;
    }
    async getDetailCategoryShop(id, user) {
        return this.getDetailCategoryShopService.getDetailCategoryShop(+id, user);
    }
};
exports.GetDetailCategoryShopController = GetDetailCategoryShopController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: app_permission_1.resourcesV1.GET_DETAIL_CATEGORY_SHOP.displayName }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(4),
    (0, common_1.Get)(app_routes_1.routesV1.categoryShop.getOne),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], GetDetailCategoryShopController.prototype, "getDetailCategoryShop", null);
exports.GetDetailCategoryShopController = GetDetailCategoryShopController = __decorate([
    (0, swagger_1.ApiTags)(`${app_permission_1.resourcesV1.GET_DETAIL_CATEGORY_SHOP.parent}`),
    (0, common_1.Controller)(app_routes_1.routesV1.apiversion),
    __metadata("design:paramtypes", [getDetail_category_shop_service_1.GetDetailCategoryShopService])
], GetDetailCategoryShopController);
//# sourceMappingURL=getDetail-category-shop.controller.js.map