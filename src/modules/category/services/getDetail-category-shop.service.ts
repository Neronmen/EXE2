import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class GetDetailCategoryShopService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }
    async getDetailCategoryShop(id: number, user) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { userID: user.id },
        });
        if (!seller) return errorResponse(400, "Bạn chưa có shop", "NO_SHOP");

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

        if (!category) return errorResponse(404, "Danh mục shop không tồn tại", "CATEGORY_SHOP_NOT_FOUND");

        return successResponse(200, category, "Lấy danh mục shop thành công");
    }


}
