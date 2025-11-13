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
exports.DeleteCategoryGlobalService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let DeleteCategoryGlobalService = class DeleteCategoryGlobalService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async deleteCategoryGlobal(id) {
        const category = await this.prisma.categoryGlobal.findUnique({ where: { id } });
        if (!category) {
            return (0, response_util_1.errorResponse)(400, "Danh mục không tồn tại");
        }
        const existProduct = await this.prisma.product.findFirst({
            where: { categoryGlobalID: id },
        });
        if (existProduct) {
            return (0, response_util_1.errorResponse)(400, "Không thể xóa vì vẫn còn sản phẩm thuộc danh mục này", "CATEGORY_IN_USE");
        }
        await this.prisma.categoryGlobal.delete({ where: { id } });
        return (0, response_util_1.successResponse)(200, null, "Xóa danh mục toàn cục thành công");
    }
};
exports.DeleteCategoryGlobalService = DeleteCategoryGlobalService;
exports.DeleteCategoryGlobalService = DeleteCategoryGlobalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DeleteCategoryGlobalService);
//# sourceMappingURL=delete-category-global.service.js.map