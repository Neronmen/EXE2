import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetAllProductClientQueryDto } from "../dtos/get-all-product.client.query";

@Injectable()
export class GetAllProductByCategoryGlobalClientService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async getAll(params: GetAllProductClientQueryDto, categoryGlobalID: number) {
        const { page = 1, limit = 20, search } = params;
        const skip = (page - 1) * limit;
        const categoryGlobal = await this.prisma.categoryGlobal.findUnique({
            where: { id: categoryGlobalID },
            select: { id: true },
        });
        if (!categoryGlobal) {
            return errorResponse(400, 'Không tìm thấy danh mục');
        }

        let where: any = { categoryGlobalID, isDeleted: false, isActive: true }
        if (search) {
            where.OR = [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ];
        }
        const [products, total] = await this.prisma.$transaction([
            this.prisma.product.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    basePrice: true,
                    stock: true,
                    minOrderQty: true,
                    isActive: true,
                    CategoryGlobal: { select: { id: true, name: true } },
                    CategoryShop: { select: { id: true, name: true } },
                    SellerProfile: { select: { id: true, companyName: true, slug: true, shopAvatar: true, brandName: true } },
                    ProductImage: {
                        where: { isMain: true },
                        select: { url: true, isMain: true },
                    },
                    PricingTier: {
                        select: { minQty: true, price: true },
                        orderBy: { minQty: "asc" },
                    },
                },
            }),
            this.prisma.product.count({
                where,
            }),
        ]);
        const pagination = { page, limit, total, totalPages: Math.ceil(total / limit) };
        const result = {
            products,
            pagination,
        }
        return successResponse(200, result, "Lấy danh sách sản phẩm theo danh mục toàn cục thành công");
    }
}
