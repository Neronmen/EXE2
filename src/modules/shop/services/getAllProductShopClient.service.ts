import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetAllProductClientQueryDto } from "../dtos/get-all-product.client.query";

@Injectable()
export class GetAllProductShopClientService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async getAll(params: GetAllProductClientQueryDto, slug: string) {
        const { page = 1, limit = 20, search } = params;
        const skip = (page - 1) * limit;
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { slug },
            select: {
                id: true,

            },
        });
        if (!seller) {
            return errorResponse(400, 'Không tìm thấy shop');
        }

        const where: any = { sellerID: seller.id, isDeleted: false, isActive: true };

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
                    CategoryGlobal: { select: { id: true, name: true } },
                    CategoryShop: { select: { id: true, name: true } },
                    updatedAt: true,
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
            this.prisma.product.count({ where }),
        ]);
        const pagination = { page, limit, total, totalPages: Math.ceil(total / limit) };
        const result = {
            products,
            pagination,
        }
        return successResponse(200, result, "Lấy danh sách sản phẩm của shop thành công");
    }
}
