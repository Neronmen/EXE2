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
exports.GetDetailCategoryShopService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let GetDetailCategoryShopService = class GetDetailCategoryShopService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDetailCategoryShop(id, user) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { userID: user.id },
        });
        if (!seller)
            return (0, response_util_1.errorResponse)(400, "Bạn chưa có shop", "NO_SHOP");
        const category = await this.prisma.categoryShop.findUnique({
            where: { id: id },
            select: {
                id: true, name: true, slug: true, image: true, description: true,
                CategoryGlobal: { select: { id: true, name: true } },
                Product: {
                    where: { sellerID: seller.id, isDeleted: false, },
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        basePrice: true,
                        stock: true,
                        minOrderQty: true,
                        isActive: true,
                        ProductImage: {
                            where: { isMain: true },
                            select: { url: true },
                        },
                        PricingTier: { select: { minQty: true, price: true } },
                    },
                },
                _count: { select: { Product: true } },
            },
        });
        if (!category)
            return (0, response_util_1.errorResponse)(404, "Danh mục shop không tồn tại", "CATEGORY_SHOP_NOT_FOUND");
        return (0, response_util_1.successResponse)(200, category, "Lấy danh mục shop thành công");
    }
};
exports.GetDetailCategoryShopService = GetDetailCategoryShopService;
exports.GetDetailCategoryShopService = GetDetailCategoryShopService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GetDetailCategoryShopService);
//# sourceMappingURL=getDetail-category-shop.service.js.map