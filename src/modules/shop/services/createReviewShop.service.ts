import { Injectable } from '@nestjs/common';
import type { MulterFile } from 'multer';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { SupabaseService } from 'src/modules/common/subapase/supabase.service';
import { CreateShopReviewDto } from '../dtos/create-review-shop.dto';
import { errorResponse, successResponse } from 'src/common/utils/response.util';

@Injectable()
export class CreateShopReviewService {
    constructor(
        private prisma: PrismaService,
        private supabase: SupabaseService,
    ) { }

    async createReview(dto: CreateShopReviewDto, files: any, user: any) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { id: dto.sellerID },
        });
        if (seller?.userID === user.id) {
            return errorResponse(400, "Bạn không thể tự đánh giá chính cửa hàng của mình", "CANNOT_FOLLOW_OWN_SHOP");
        }
        if (!seller) return errorResponse(400, 'Shop không tồn tại', 'SHOP_NOT_FOUND');

        const existed = await this.prisma.shopReview.findFirst({
            where: { userID: user.id, sellerID: dto.sellerID },
        });
        if (existed) return errorResponse(400, 'Bạn đã đánh giá shop này rồi', 'ALREADY_REVIEWED');

        let uploadedUrls: string[] = [];
        if (files?.images?.length > 0) {
            uploadedUrls = await this.supabase.upload(files.images);
        }

        const review = await this.prisma.shopReview.create({
            data: {
                userID: user.id,
                sellerID: dto.sellerID,
                rating: dto.rating,
                comment: dto.comment ?? null,
            },
        });

        if (uploadedUrls.length > 0) {
            for (let i = 0; i < uploadedUrls.length; i++) {
                const img = files.images[i];
                await this.prisma.reviewShopImage.create({
                    data: {
                        shopReviewID: review.id,
                        url: uploadedUrls[i],
                        filename: img.originalname,
                        mimeType: img.mimetype,
                        size: img.size,
                    },
                });
            }
        }

        // Cập nhật điểm trung bình & tổng review cho seller
        const stats = await this.prisma.shopReview.aggregate({
            where: { sellerID: dto.sellerID },
            _avg: { rating: true },
            _count: { rating: true },
        });

        await this.prisma.sellerProfile.update({
            where: { id: dto.sellerID },
            data: {
                avgRating: stats._avg.rating ?? 0,
                totalReviews: stats._count.rating,
            },
        });

        return successResponse(200, review, 'Đánh giá shop thành công');
    }
}
