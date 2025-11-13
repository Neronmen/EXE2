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
exports.GetDetailProductShopClientService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let GetDetailProductShopClientService = class GetDetailProductShopClientService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async getDetailProductShop(productId, user) {
        console.log(user);
        const product = await this.prisma.product.findFirst({
            where: { id: productId, isDeleted: false, isActive: true },
            select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                origin: true,
                brand: true,
                unit: true,
                region: true,
                condition: true,
                season: true,
                storageInstructions: true,
                usageInstructions: true,
                certifications: true,
                basePrice: true,
                minOrderQty: true,
                isActive: true,
                isFeatured: true,
                stock: true,
                soldCount: true,
                avgRating: true,
                totalReviews: true,
                createdAt: true,
                SellerProfile: { select: { id: true, companyName: true, slug: true, shopAvatar: true, brandName: true } },
                CategoryGlobal: { select: { id: true, name: true } },
                CategoryShop: { select: { id: true, name: true } },
                ProductImage: { select: { id: true, url: true, isMain: true }, orderBy: { isMain: "desc" } },
                PricingTier: { select: { id: true, minQty: true, price: true }, orderBy: { minQty: "asc" } },
                _count: {
                    select: { ProductLike: true },
                },
                ProductReview: {
                    take: 10,
                    orderBy: { createdAt: "desc" },
                    select: {
                        id: true,
                        rating: true,
                        content: true,
                        createdAt: true,
                        user: { select: { id: true, name: true, avatar: true } },
                        ReviewProductImage: { select: { url: true } },
                    },
                },
                ProductComment: {
                    take: 10,
                    orderBy: { createdAt: "desc" },
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        user: { select: { id: true, name: true, avatar: true } },
                        ProductCommentImage: { select: { url: true } },
                        _count: {
                            select: { ProductCommentLike: true }
                        }
                    },
                },
            },
        });
        let isLiked = false;
        if (user && user.id) {
            console.log(user);
            const liked = await this.prisma.productLike.findFirst({
                where: { productID: productId, userID: user.id },
                select: { id: true },
            });
            isLiked = !!liked;
            console.log(isLiked);
        }
        const result = {
            ...product,
            isLiked,
        };
        if (!product)
            return (0, response_util_1.errorResponse)(404, "Sản phẩm không tồn tại", "PRODUCT_NOT_FOUND");
        return (0, response_util_1.successResponse)(200, result, "Lấy chi tiết sản phẩm thành công");
    }
};
exports.GetDetailProductShopClientService = GetDetailProductShopClientService;
exports.GetDetailProductShopClientService = GetDetailProductShopClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], GetDetailProductShopClientService);
//# sourceMappingURL=getDetailProductShop.service.js.map