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
exports.RejectRegisterSellerController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../configs/app.routes");
const app_permission_1 = require("../../../configs/app.permission");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const permissions_guard_1 = require("../../auth/guards/permissions.guard");
const permission_decorator_1 = require("../../auth/guards/permission.decorator");
const reject_register_seller_dto_1 = require("../dtos/reject-register-seller.dto");
const rejectRegisterSeller_service_1 = require("../services/rejectRegisterSeller.service");
let RejectRegisterSellerController = class RejectRegisterSellerController {
    RejectRegisterSellerService;
    constructor(RejectRegisterSellerService) {
        this.RejectRegisterSellerService = RejectRegisterSellerService;
    }
    async rejectRegister(sellerID, dto) {
        return await this.RejectRegisterSellerService.rejectRegister(Number(sellerID), dto);
    }
};
exports.RejectRegisterSellerController = RejectRegisterSellerController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: app_permission_1.resourcesV1.REJECT__REGISTER_SELLER.displayName }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard, permissions_guard_1.PermissionGuard),
    (0, permission_decorator_1.Permissions)("REJECT_SELLER_REGISTER"),
    (0, common_1.Patch)(app_routes_1.routesV1.seller.rejectRegisterSeller),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reject_register_seller_dto_1.RejectRegisterSellersDto]),
    __metadata("design:returntype", Promise)
], RejectRegisterSellerController.prototype, "rejectRegister", null);
exports.RejectRegisterSellerController = RejectRegisterSellerController = __decorate([
    (0, swagger_1.ApiTags)(`${app_permission_1.resourcesV1.REJECT__REGISTER_SELLER.parent}`),
    (0, common_1.Controller)(app_routes_1.routesV1.apiversion),
    __metadata("design:paramtypes", [rejectRegisterSeller_service_1.RejectRegisterSellerService])
], RejectRegisterSellerController);
//# sourceMappingURL=rejectRegisterSeller.controller.js.map