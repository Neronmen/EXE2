import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class MyShopReviewService {
    constructor(private prisma: PrismaService) { }
    async myReview(sellerID: number, user) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { id: sellerID },
        });
        if (!seller) return errorResponse(400, 'Shop không tồn tại', 'SHOP_NOT_FOUND');

        const review = await this.prisma.shopReview.findFirst({
            where: {
                userID: user.id,
                sellerID
            }, include: {
                user: {
                    select: { id: true, name: true, avatar: true },
                },
                ReviewShopImage: {
                    select: { id: true, url: true },
                },
            },
        });

        return successResponse(200, review, 'Lấy đánh giá của bạn dành cho shop thành công')

    }

}
