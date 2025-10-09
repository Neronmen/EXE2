import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { CreateProductDto } from "../dtos/create-product.dto";
import { slugify } from "transliteration";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
import { GetAllProductQueryDto } from "../dtos/get-all-product.query";

@Injectable()
export class GetAllProductService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async getAll(params: GetAllProductQueryDto, user) {
        const { page = 1, limit = 20, search, categoryGlobalID, categoryShopID, isActive = false } = params;
        const skip = (page - 1) * limit;
        const seller = await this.prisma.sellerProfile.findFirst({ where: { userID: user.id } });
        if (!seller) {
            return errorResponse(400, "Người dùng không phải người bán", "USER_NOT_SELLER");
        }

        const where: any = { sellerID: seller.id, isDeleted: false };
        if (isActive !== undefined) {
            console.log(isActive);
            where.isActive = isActive;
        }


        if (search) {
            where.OR = [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ];
        }

        if (categoryGlobalID) {
            where.categoryGlobalID = categoryGlobalID;
        }

        if (categoryShopID) where.categoryShopID = categoryShopID;



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
                    // origin: true,
                    // brand: true,
                    unit: true,
                    soldCount: true,
                    viewCount: true,
                    totalReviews: true,
                    avgRating: true,
                    // description: true,
                    basePrice: true,
                    stock: true,
                    // minOrderQty: true,
                    region: true,
                    categoryGlobalID: true,
                    categoryShopID: true,
                    isActive: true,
                    createdAt: true,
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
        return successResponse(200, result, "Lấy danh sách sản phẩm thành công");
    }
}
