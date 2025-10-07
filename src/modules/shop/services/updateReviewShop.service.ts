import { Injectable } from "@nestjs/common";
import { UpdateShopReviewDto } from "../dtos/update-review-shop.dto";
import type { File as MulterFile } from "multer";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";

@Injectable()
export class UpdateShopReviewService {
    constructor(
        private prisma: PrismaService,
        private supabase: SupabaseService,
    ) { }

    async updateReview(id: number, dto: UpdateShopReviewDto, files: { images?: MulterFile[] }, user) {
        const review = await this.prisma.shopReview.findUnique({
            where: { id },
        });

        if (!review) {
            return errorResponse(400, "Không tìm thấy đánh giá này", "REVIEW_NOT_FOUND");
        }

        if (review.userID !== user.id) {
            return errorResponse(400, "Bạn không thể chỉnh sửa đánh giá của người khác", "FORBIDDEN");
        }

        let uploadedUrls: string[] = [];

        if (files?.images?.length) {
            uploadedUrls = await this.supabase.upload(files.images);

            await this.prisma.reviewShopImage.deleteMany({
                where: { shopReviewID: id },
            });

            for (let i = 0; i < uploadedUrls.length; i++) {
                const f = files.images[i];
                await this.prisma.reviewShopImage.create({
                    data: {
                        shopReviewID: id,
                        url: uploadedUrls[i],
                        filename: f.originalname,
                        mimeType: f.mimetype,
                        size: f.size,
                    },
                });
            }
        }

        const updatedReview = await this.prisma.shopReview.update({
            where: { id },
            data: {
                rating: dto.rating ?? review.rating,
                comment: dto.comment ?? review.comment,
            },
            include: {
                ReviewShopImage: { select: { id: true, url: true } },
            },
        });

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

        return successResponse(200, updatedReview, "Cập nhật đánh giá thành công");
    }
}
