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
exports.DeleteReviewShopController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../configs/app.routes");
const app_permission_1 = require("../../../configs/app.permission");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const get_user_decorator_1 = require("../../auth/guards/get-user.decorator");
const deleteReviewShop_service_1 = require("../services/deleteReviewShop.service");
let DeleteReviewShopController = class DeleteReviewShopController {
    DeleteReviewService;
    constructor(DeleteReviewService) {
        this.DeleteReviewService = DeleteReviewService;
    }
    async deleteReviewShop(reviewID, user) {
        return await this.DeleteReviewService.deleteReview(+reviewID, user);
    }
};
exports.DeleteReviewShopController = DeleteReviewShopController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: app_permission_1.resourcesV1.DELETE_REVIEW_SHOP.displayName }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard),
    (0, common_1.Delete)(app_routes_1.routesV1.shop.updateReviewShop),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DeleteReviewShopController.prototype, "deleteReviewShop", null);
exports.DeleteReviewShopController = DeleteReviewShopController = __decorate([
    (0, swagger_1.ApiTags)(`${app_permission_1.resourcesV1.DELETE_REVIEW_SHOP.parent}`),
    (0, common_1.Controller)(app_routes_1.routesV1.apiversion),
    __metadata("design:paramtypes", [deleteReviewShop_service_1.DeleteReviewService])
], DeleteReviewShopController);
//# sourceMappingURL=deleteReviewShop.controller.js.map