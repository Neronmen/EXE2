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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllProductHomePageShopClientController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../configs/app.routes");
const app_permission_1 = require("../../../configs/app.permission");
const swagger_1 = require("@nestjs/swagger");
const getProductHomePage_service_1 = require("../services/getProductHomePage.service");
let GetAllProductHomePageShopClientController = class GetAllProductHomePageShopClientController {
    getAllProductHomePageClientService;
    constructor(getAllProductHomePageClientService) {
        this.getAllProductHomePageClientService = getAllProductHomePageClientService;
    }
    async getAllProductHomePageShopClient() {
        return this.getAllProductHomePageClientService.getAllProductHomePage();
    }
};
exports.GetAllProductHomePageShopClientController = GetAllProductHomePageShopClientController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: app_permission_1.resourcesV1.GET_ALL_PRODUCT_HOMEPAGE_CLIENT.displayName }),
    (0, common_1.Get)(app_routes_1.routesV1.shop.getAllProductHomePageClient),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GetAllProductHomePageShopClientController.prototype, "getAllProductHomePageShopClient", null);
exports.GetAllProductHomePageShopClientController = GetAllProductHomePageShopClientController = __decorate([
    (0, swagger_1.ApiTags)(`${app_permission_1.resourcesV1.GET_ALL_PRODUCT_HOMEPAGE_CLIENT.parent}`),
    (0, common_1.Controller)(app_routes_1.routesV1.apiversion),
    __metadata("design:paramtypes", [getProductHomePage_service_1.GetAllProductHomePageClientService])
], GetAllProductHomePageShopClientController);
//# sourceMappingURL=getProductHomePage.controller.js.map