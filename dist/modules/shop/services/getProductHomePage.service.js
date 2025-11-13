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
exports.GetAllProductHomePageClientService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const response_util_1 = require("../../../common/utils/response.util");
let GetAllProductHomePageClientService = class GetAllProductHomePageClientService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    getStockStatus(stock) {
        if (stock <= 0)
            return 'out_of_stock';
        if (stock <= 5)
            return 'low_stock';
        return 'in_stock';
    }
    async getAllProductHomePage() {
        const [categoryGlobal, featuredProducts, bestSellers, newArrivals, topRatedShops] = await Promise.all([
            this.prisma.categoryGlobal.findMany({
                select: { id: true, name: true, slug: true, image: true },
            }),
            this.prisma.product.findMany({
                where: { isActive: true, isDeleted: false, isFeatured: true },
                orderBy: { updatedAt: 'desc' },
                take: 10,
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    basePrice: true,
                    soldCount: true,
                    minOrderQty: true,
                    stock: true,
                    avgRating: true,
                    totalReviews: true,
                    ProductImage: { where: { isMain: true }, select: { url: true } },
                    SellerProfile: { select: { id: true, companyName: true, slug: true, shopAvatar: true, brandName: true } },
                },
            }),
            this.prisma.product.findMany({
                where: { isActive: true, isDeleted: false },
                orderBy: { soldCount: 'desc' },
                take: 10,
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    basePrice: true,
                    soldCount: true,
                    minOrderQty: true,
                    stock: true,
                    avgRating: true,
                    totalReviews: true,
                    SellerProfile: { select: { id: true, companyName: true, slug: true, shopAvatar: true, brandName: true } },
                    ProductImage: { where: { isMain: true }, select: { url: true } },
                },
            }),
            this.prisma.product.findMany({
                where: { isActive: true, isDeleted: false },
                orderBy: { createdAt: 'desc' },
                take: 10,
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    basePrice: true,
                    minOrderQty: true,
                    stock: true,
                    soldCount: true,
                    avgRating: true,
                    totalReviews: true,
                    createdAt: true,
                    SellerProfile: { select: { id: true, companyName: true, slug: true, shopAvatar: true, brandName: true } },
                    ProductImage: { where: { isMain: true }, select: { url: true } },
                },
            }),
            this.prisma.sellerProfile.findMany({
                where: { status: 'APPROVED' },
                orderBy: { avgRating: 'desc' },
                take: 10,
                select: {
                    id: true,
                    slug: true,
                    companyName: true,
                    brandName: true,
                    shopAvatar: true,
                    avgRating: true,
                    totalFollowers: true,
                },
            }),
        ]);
        const banners = [
            { id: 1, image: 'https://cdn.example.com/banner1.jpg' },
            { id: 2, image: 'https://cdn.example.com/banner3.jpg', },
        ];
        return (0, response_util_1.successResponse)(200, {
            banners: banners,
            categoryGlobal: categoryGlobal,
            featuredProducts: featuredProducts,
            bestSellers: bestSellers,
            newProducts: newArrivals,
            topRatedShops,
        }, 'Lấy dữ liệu trang chủ thành công');
    }
};
exports.GetAllProductHomePageClientService = GetAllProductHomePageClientService;
exports.GetAllProductHomePageClientService = GetAllProductHomePageClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GetAllProductHomePageClientService);
//# sourceMappingURL=getProductHomePage.service.js.map