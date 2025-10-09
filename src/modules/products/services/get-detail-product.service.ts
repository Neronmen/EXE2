import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";

@Injectable()
export class SellerProductService {
    constructor(private readonly prisma: PrismaService) { }

    async getProductDetail(productId: number, userId: number) {
        // Lấy seller của user
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { userID: userId },
        });
        if (!seller) return errorResponse(400, "Người dùng không phải seller", "USER_NOT_SELLER");

        // Lấy chi tiết product
        const product = await this.prisma.product.findFirst({
            where: { id: productId, sellerID: seller.id, isDeleted: false },
            include: {
                // Category
                CategoryGlobal: { select: { id: true, name: true } },
                CategoryShop: { select: { id: true, name: true } },

                // Images
                ProductImage: { select: { id: true, url: true, isMain: true }, orderBy: { isMain: "desc" } },

                // Pricing tiers
                PricingTier: { select: { id: true, minQty: true, price: true }, orderBy: { minQty: "asc" } },

                // Likes
                // ProductLike: { select: { user: { select: { id: true, name: true, avatar: true } } } },

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

        if (!product) return errorResponse(404, "Sản phẩm không tồn tại", "PRODUCT_NOT_FOUND");

        return successResponse(200, product, "Lấy chi tiết sản phẩm thành công");
    }
}
