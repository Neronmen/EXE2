import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class GetListCategoryShopService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }
    async getListCategoryShop(user) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { userID: user.id },
        });
        if (!seller) return errorResponse(400, "Bạn chưa có shop", "NO_SHOP");

        const categories = await this.prisma.categoryShop.findMany({
            where: { sellerID: seller.id },
            include: {
                CategoryGlobal: { select: { id: true, name: true } },
                _count: {
                    select: { Product: true },
                },
            },
        });

        const result = categories.map((c) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            description: c.description,
            image: c.image,
            categoryGlobal: c.CategoryGlobal,
            totalProducts: c._count.Product,
        }));

        return successResponse(200, result, "Lấy danh mục shop thành công");

    }

}
