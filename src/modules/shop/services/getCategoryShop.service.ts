import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class GetDetailCategoryShopClientService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    getStockStatus(stock: number) {
        if (stock <= 0) return "out_of_stock";
        if (stock <= 5) return "low_stock";
        return "in_stock";
    }
    async getDetailCategoryShopBySlug(categoryID: number, slug: string) {
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
            return errorResponse(400, 'Không tìm thấy shop');
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
            return errorResponse(400, "Danh mục shop không tồn tại", "CATEGORY_SHOP_NOT_FOUND");
        }

        // const products = category.Product.map((p) => ({
        //     id: p.id,
        //     title: p.title,
        //     slug: p.slug,
        //     basePrice: p.basePrice,
        //     minOrderQty: p.minOrderQty,
        //     isActive: p.isActive,
        //     stockStatus: this.getStockStatus(p.stock),
        //     mainImage: p.ProductImage[0]?.url || null,
        //     pricingTiers: p.PricingTier,
        // }));

        // const result = {
        //     ...category,
        //     Product: products,
        // };

        return successResponse(200, category, 'Lấy thông tin chi tiet danh muc shop thành công');
    }

}