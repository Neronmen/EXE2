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
exports.DeleteCategoryShopService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let DeleteCategoryShopService = class DeleteCategoryShopService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async deleteCategoryShop(id, user) {
        const existing = await this.prisma.categoryShop.findUnique({ where: { id } });
        if (!existing) {
            return (0, response_util_1.errorResponse)(404, "Không tìm thấy danh mục", "NOT_FOUND");
        }
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { userID: user.id },
        });
        if (existing.sellerID !== seller?.id) {
            return (0, response_util_1.errorResponse)(400, "Bạn không có quyền xóa danh mục", "FORBIDDEN");
        }
        const productExist = await this.prisma.product.findFirst({
            where: { categoryShopID: id },
        });
        if (productExist) {
            return (0, response_util_1.errorResponse)(400, "Không thể xóa danh mục vì vẫn có sản phẩm", "CATEGORY_IN_USE");
        }
        await this.prisma.categoryShop.delete({ where: { id } });
        return (0, response_util_1.successResponse)(200, null, "Xóa danh mục thành công");
    }
};
exports.DeleteCategoryShopService = DeleteCategoryShopService;
exports.DeleteCategoryShopService = DeleteCategoryShopService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DeleteCategoryShopService);
//# sourceMappingURL=delete-category-shop.service.js.map