import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class DeleteReviewService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }
    async deleteReview(reviewID: number, user) {
        const review = await this.prisma.shopReview.findUnique({
            where: { id: reviewID },
        });

        if (!review) {
            return errorResponse(400, "Không tìm thấy đánh giá này", "REVIEW_NOT_FOUND");
        }

        if (review.userID !== user.id) {
            return errorResponse(400, "Bạn không thể xóa đánh giá của người khác", "FORBIDDEN");
        }

        await this.prisma.$transaction([
            this.prisma.reviewShopImage.deleteMany({
                where: {
                    shopReviewID: review.id
                }
            }),
            this.prisma.shopReview.delete({
                where: { id: reviewID },
            })
        ]);

        // Cập nhật điểm trung bình & tổng review cho seller
        const stats = await this.prisma.shopReview.aggregate({
            where: { sellerID: review.sellerID },
            _avg: { rating: true },
            _count: { rating: true },
        });


        await this.prisma.sellerProfile.update({
            where: { id: review.sellerID },
            data: {
                avgRating: stats._avg.rating ?? 0,
                totalReviews: stats._count.rating,
            },
        });

        return successResponse(200, "Xóa đánh giá cửa hàng thành công");
    }

}