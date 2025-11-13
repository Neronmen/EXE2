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
exports.GetCategoryShopClientController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../configs/app.routes");
const app_permission_1 = require("../../../configs/app.permission");
const swagger_1 = require("@nestjs/swagger");
const getCategoryShop_service_1 = require("../services/getCategoryShop.service");
let GetCategoryShopClientController = class GetCategoryShopClientController {
    getDetailCategoryShopClientService;
    constructor(getDetailCategoryShopClientService) {
        this.getDetailCategoryShopClientService = getDetailCategoryShopClientService;
    }
    async getDetailCategoryShopClient(categoryID, slug) {
        return this.getDetailCategoryShopClientService.getDetailCategoryShopBySlug(+categoryID, slug);
    }
};
exports.GetCategoryShopClientController = GetCategoryShopClientController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: app_permission_1.resourcesV1.GET_DETAIL_CATEGORY_SHOP_CLIENT.displayName }),
    (0, common_1.Get)(app_routes_1.routesV1.shop.getDetailCategoryShopListClient),
    __param(0, (0, common_1.Param)('categoryID', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], GetCategoryShopClientController.prototype, "getDetailCategoryShopClient", null);
exports.GetCategoryShopClientController = GetCategoryShopClientController = __decorate([
    (0, swagger_1.ApiTags)(`${app_permission_1.resourcesV1.GET_DETAIL_CATEGORY_SHOP_CLIENT.parent}`),
    (0, common_1.Controller)(app_routes_1.routesV1.apiversion),
    __metadata("design:paramtypes", [getCategoryShop_service_1.GetDetailCategoryShopClientService])
], GetCategoryShopClientController);
//# sourceMappingURL=getCategoryShop.service.js.map