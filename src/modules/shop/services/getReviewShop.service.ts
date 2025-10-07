import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class ShopReviewService {
    constructor(private prisma: PrismaService) { }

    async getShopReviews(sellerID: number, pagination: { page: number; limit: number }) {
        const shop = await this.prisma.sellerProfile.findUnique({ where: { id: sellerID } });
        if (!shop) return errorResponse(400, "Không tìm thấy shop", "SHOP_NOT_FOUND");

        const { page, limit } = pagination;
        const skip = (page - 1) * limit;

        const reviews = await this.prisma.shopReview.findMany({
            where: { sellerID },
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
            include: {
                user: {
                    select: { id: true, name: true, avatar: true },
                },
                ReviewShopImage: {
                    select: { id: true, url: true },
                },
            },
        });

        const total = await this.prisma.shopReview.count({ where: { sellerID } });

        return successResponse(200, {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            reviews,
        }, "Lấy danh sách đánh giá shop thành công");
    }
}
