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
exports.SetMainImageProductController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../configs/app.routes");
const app_permission_1 = require("../../../configs/app.permission");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/guards/roles.decorator");
const get_user_decorator_1 = require("../../auth/guards/get-user.decorator");
const set_main_image_product_service_1 = require("../services/set-main-image-product.service");
let SetMainImageProductController = class SetMainImageProductController {
    setMainImageProductService;
    constructor(setMainImageProductService) {
        this.setMainImageProductService = setMainImageProductService;
    }
    async setMainProduct(id, imageId, user) {
        return this.setMainImageProductService.setMainImage(id, imageId, user);
    }
};
exports.SetMainImageProductController = SetMainImageProductController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: app_permission_1.resourcesV1.SET_MAIN_IMAGE_PRODUCT.displayName }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(4),
    (0, common_1.Patch)(app_routes_1.routesV1.product.setMain),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)("imageId")),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], SetMainImageProductController.prototype, "setMainProduct", null);
exports.SetMainImageProductController = SetMainImageProductController = __decorate([
    (0, swagger_1.ApiTags)(`${app_permission_1.resourcesV1.SET_MAIN_IMAGE_PRODUCT.parent}`),
    (0, common_1.Controller)(app_routes_1.routesV1.apiversion),
    __metadata("design:paramtypes", [set_main_image_product_service_1.SetMainImageProductService])
], SetMainImageProductController);
//# sourceMappingURL=set-main-image-product.controller.js.map