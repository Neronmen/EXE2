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
exports.GetDetailCategoryShopClientService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let GetDetailCategoryShopClientService = class GetDetailCategoryShopClientService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    getStockStatus(stock) {
        if (stock <= 0)
            return "out_of_stock";
        if (stock <= 5)
            return "low_stock";
        return "in_stock";
    }
    async getDetailCategoryShopBySlug(categoryID, slug) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { slug },
            select: {
                id: true,
                slug: true,
                brandName: true,
                companyName: true,
                businessPhone: true,
                businessAddress: true,
                description: true,
                shopAvatar: true,
                shopBanner: true,
                avgRating: true,
                totalReviews: true,
                totalFollowers: true,
                status: true,
                createdAt: true,
                user: {
                    select: { id: true, name: true, email: true, avatar: true },
                },
            },
        });
        if (!seller) {
            return (0, response_util_1.errorResponse)(400, 'Không tìm thấy shop');
        }
        const category = await this.prisma.categoryShop.findUnique({
            where: { id: categoryID, sellerID: seller.id },
            select: {
                id: true,
                name: true,
                slug: true,
                image: true,
                description: true,
                CategoryGlobal: { select: { id: true, name: true } },
                Product: {
                    where: { sellerID: seller.id, isDeleted: false, isActive: true },
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        basePrice: true,
                        stock: true,
                        minOrderQty: true,
                        isActive: true,
                        SellerProfile: { select: { id: true, companyName: true, slug: true, shopAvatar: true, brandName: true } },
                        CategoryGlobal: { select: { id: true, name: true } },
                        CategoryShop: { select: { id: true, name: true } },
                        ProductImage: {
                            where: { isMain: true },
                            select: { url: true, isMain: true },
                        },
                        PricingTier: {
                            select: { minQty: true, price: true },
                            orderBy: { minQty: "asc" },
                        },
                    },
                },
                _count: { select: { Product: true } },
            },
        });
        if (!category) {
            return (0, response_util_1.errorResponse)(400, "Danh mục shop không tồn tại", "CATEGORY_SHOP_NOT_FOUND");
        }
        return (0, response_util_1.successResponse)(200, category, 'Lấy thông tin chi tiet danh muc shop thành công');
    }
};
exports.GetDetailCategoryShopClientService = GetDetailCategoryShopClientService;
exports.GetDetailCategoryShopClientService = GetDetailCategoryShopClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], GetDetailCategoryShopClientService);
//# sourceMappingURL=getCategoryShop.service.js.map