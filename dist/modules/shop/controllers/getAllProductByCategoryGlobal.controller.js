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
exports.GetAllProductByCategoryGlobalClientController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../configs/app.routes");
const app_permission_1 = require("../../../configs/app.permission");
const swagger_1 = require("@nestjs/swagger");
const get_all_product_client_query_1 = require("../dtos/get-all-product.client.query");
const getAllProductByCategoryGlobal_service_1 = require("../services/getAllProductByCategoryGlobal.service");
let GetAllProductByCategoryGlobalClientController = class GetAllProductByCategoryGlobalClientController {
    getAllProductByCategoryGlobalClientService;
    constructor(getAllProductByCategoryGlobalClientService) {
        this.getAllProductByCategoryGlobalClientService = getAllProductByCategoryGlobalClientService;
    }
    async getAllProductShopClient(query, id) {
        return this.getAllProductByCategoryGlobalClientService.getAll(query, id);
    }
};
exports.GetAllProductByCategoryGlobalClientController = GetAllProductByCategoryGlobalClientController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: app_permission_1.resourcesV1.GET_ALL_PRODUCT_BY_CATEGORY_GLOBAL_CLIENT.displayName }),
    (0, common_1.Get)(app_routes_1.routesV1.shop.getAllProductCategoryGlobalClient),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_all_product_client_query_1.GetAllProductClientQueryDto, Number]),
    __metadata("design:returntype", Promise)
], GetAllProductByCategoryGlobalClientController.prototype, "getAllProductShopClient", null);
exports.GetAllProductByCategoryGlobalClientController = GetAllProductByCategoryGlobalClientController = __decorate([
    (0, swagger_1.ApiTags)(`${app_permission_1.resourcesV1.GET_ALL_PRODUCT_BY_CATEGORY_GLOBAL_CLIENT.parent}`),
    (0, common_1.Controller)(app_routes_1.routesV1.apiversion),
    __metadata("design:paramtypes", [getAllProductByCategoryGlobal_service_1.GetAllProductByCategoryGlobalClientService])
], GetAllProductByCategoryGlobalClientController);
//# sourceMappingURL=getAllProductByCategoryGlobal.controller.js.map