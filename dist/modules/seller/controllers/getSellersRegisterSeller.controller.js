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
exports.GetSellersRegisterSellerController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../configs/app.routes");
const app_permission_1 = require("../../../configs/app.permission");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const permissions_guard_1 = require("../../auth/guards/permissions.guard");
const permission_decorator_1 = require("../../auth/guards/permission.decorator");
const getSellersRegisterSeller_service_1 = require("../services/getSellersRegisterSeller.service");
const get_sellers_register_seller_dto_1 = require("../dtos/get-sellers-register-seller.dto");
let GetSellersRegisterSellerController = class GetSellersRegisterSellerController {
    GetSellersRegisterSellerService;
    constructor(GetSellersRegisterSellerService) {
        this.GetSellersRegisterSellerService = GetSellersRegisterSellerService;
    }
    async getSellersRegisterSeller(query) {
        const { status } = query;
        return await this.GetSellersRegisterSellerService.getSellersRegisterSeller(status);
    }
};
exports.GetSellersRegisterSellerController = GetSellersRegisterSellerController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: app_permission_1.resourcesV1.GET_SELLERS_REGISTER_SELLER.displayName }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard, permissions_guard_1.PermissionGuard),
    (0, permission_decorator_1.Permissions)("GET_ALL_SELLERS_REGISTER"),
    (0, common_1.Get)(app_routes_1.routesV1.seller.getSellersRegisterSeller),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_sellers_register_seller_dto_1.GetAllSellersDto]),
    __metadata("design:returntype", Promise)
], GetSellersRegisterSellerController.prototype, "getSellersRegisterSeller", null);
exports.GetSellersRegisterSellerController = GetSellersRegisterSellerController = __decorate([
    (0, swagger_1.ApiTags)(`${app_permission_1.resourcesV1.GET_SELLERS_REGISTER_SELLER.parent}`),
    (0, common_1.Controller)(app_routes_1.routesV1.apiversion),
    __metadata("design:paramtypes", [getSellersRegisterSeller_service_1.GetSellersRegisterSellerService])
], GetSellersRegisterSellerController);
//# sourceMappingURL=getSellersRegisterSeller.controller.js.map