import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class GetDetailProductShopClientService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }


    async getDetailProductShop(productId: number, user) {
        console.log(user)
        // Lấy chi tiết product
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
                // Category
                CategoryGlobal: { select: { id: true, name: true } },
                CategoryShop: { select: { id: true, name: true } },

                // Images
                ProductImage: { select: { id: true, url: true, isMain: true }, orderBy: { isMain: "desc" } },

                // Pricing tiers
                PricingTier: { select: { id: true, minQty: true, price: true }, orderBy: { minQty: "asc" } },

                // Likes
                _count: {
                    select: { ProductLike: true },
                },

                // Reviews
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

                // Comments
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
            console.log(user)
            const liked = await this.prisma.productLike.findFirst({
                where: { productID: productId, userID: user.id },
                select: { id: true },
            });
            isLiked = !!liked;
            console.log(isLiked)
        }

        const result = {
            ...product,
            isLiked,
        };

        if (!product) return errorResponse(404, "Sản phẩm không tồn tại", "PRODUCT_NOT_FOUND");
        return successResponse(200, result, "Lấy chi tiết sản phẩm thành công");

    }

}