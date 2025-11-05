import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { successResponse } from 'src/common/utils/response.util';

@Injectable()
export class GetAllProductHomePageClientService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    // Hàm helper chuyển stock sang trạng thái hiển thị
    private getStockStatus(stock: number) {
        if (stock <= 0) return 'out_of_stock';
        if (stock <= 5) return 'low_stock';
        return 'in_stock';
    }

    async getAllProductHomePage() {
        // 🔹 Dùng Promise.all để chạy các query song song, tăng tốc
        const [categoryGlobal, featuredProducts, bestSellers, newArrivals, topRatedShops] =
            await Promise.all([
                // 1. Banner
                // this.prisma.banner.findMany({
                //   where: { isActive: true },
                //   orderBy: { position: 'asc' },
                //   select: { id: true, image: true, link: true },
                // }),

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
                    // select: {
                    //     id: true,
                    //     title: true,
                    //     slug: true,
                    //     description: true,
                    //     origin: true,
                    //     brand: true,
                    //     unit: true,
                    //     // region: true,
                    //     // condition: true,
                    //     // season: true,
                    //     // storageInstructions: true,
                    //     // usageInstructions: true,
                    //     // certifications: true,

                    //     basePrice: true,
                    //     minOrderQty: true,
                    //     // isActive: true,
                    //     // isFeatured: true,
                    //     stock: true,
                    //     soldCount: true,
                    //     avgRating: true,
                    //     totalReviews: true,
                    //     createdAt: true,
                    //     SellerProfile: { select: { id: true, companyName: true, slug: true, shopAvatar: true, brandName: true } },


                    //     // Images
                    //     ProductImage: { select: { id: true, url: true, isMain: true }, orderBy: { isMain: "desc" } },

                    //     // Pricing tiers
                    //     PricingTier: { select: { id: true, minQty: true, price: true }, orderBy: { minQty: "asc" } },

                    //     // Likes
                    //     ProductLike: { select: { user: { select: { id: true, name: true, avatar: true } } } },

                    //     // Reviews
                    //     // ProductReview: {
                    //     //     select: {
                    //     //         id: true,
                    //     //         rating: true,
                    //     //         content: true,
                    //     //         createdAt: true,
                    //     //         user: { select: { id: true, name: true, avatar: true } },
                    //     //         ReviewProductImage: { select: { url: true } },
                    //     //     },
                    //     //     orderBy: { createdAt: "desc" },
                    //     // },

                    //     // Comments
                    //     // ProductComment: {
                    //     //     select: {
                    //     //         id: true,
                    //     //         content: true,
                    //     //         createdAt: true,
                    //     //         user: { select: { id: true, name: true, avatar: true } },
                    //     //         ProductCommentImage: { select: { url: true } },
                    //     //         ProductCommentLike: { select: { user: { select: { id: true, name: true } } } },
                    //     //     },
                    //     //     orderBy: { createdAt: "desc" },
                    //     // },
                    // },
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

        return successResponse(200, {
            banners: banners,
            categoryGlobal: categoryGlobal,
            featuredProducts: featuredProducts,
            bestSellers: bestSellers,
            newProducts: newArrivals,
            topRatedShops,
        }, 'Lấy dữ liệu trang chủ thành công');
    }
}
