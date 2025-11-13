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
exports.ViewUsersLikeProductProductController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../configs/app.routes");
const app_permission_1 = require("../../../configs/app.permission");
const swagger_1 = require("@nestjs/swagger");
const view_users_like_product_service_1 = require("../services/view-users-like-product.service");
let ViewUsersLikeProductProductController = class ViewUsersLikeProductProductController {
    viewUserLikeProductService;
    constructor(viewUserLikeProductService) {
        this.viewUserLikeProductService = viewUserLikeProductService;
    }
    async viewLikes(id) {
        return this.viewUserLikeProductService.viewUserLikeProduct(Number(id));
    }
};
exports.ViewUsersLikeProductProductController = ViewUsersLikeProductProductController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: app_permission_1.resourcesV1.VIEW_USERS_LIKE_PRODUCT.displayName }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(app_routes_1.routesV1.product.viewUsersLikeProduct),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ViewUsersLikeProductProductController.prototype, "viewLikes", null);
exports.ViewUsersLikeProductProductController = ViewUsersLikeProductProductController = __decorate([
    (0, swagger_1.ApiTags)(`${app_permission_1.resourcesV1.VIEW_USERS_LIKE_PRODUCT.parent}`),
    (0, common_1.Controller)(app_routes_1.routesV1.apiversion),
    __metadata("design:paramtypes", [view_users_like_product_service_1.ViewUserLikeProductService])
], ViewUsersLikeProductProductController);
//# sourceMappingURL=view-users-like-product.controller.js.map