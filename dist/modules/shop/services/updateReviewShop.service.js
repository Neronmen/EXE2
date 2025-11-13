"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateShopReviewService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../../common/subapase/supabase.service");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const response_util_1 = require("../../../common/utils/response.util");
let UpdateShopReviewService = class UpdateShopReviewService {
    prisma;
    supabase;
    constructor(prisma, supabase) {
        this.prisma = prisma;
        this.supabase = supabase;
    }
    async updateReview(id, dto, files, user) {
        const review = await this.prisma.shopReview.findUnique({
            where: { id },
        });
        if (!review) {
            return (0, response_util_1.errorResponse)(400, "Không tìm thấy đánh giá này", "REVIEW_NOT_FOUND");
        }
        if (review.userID !== user.id) {
            return (0, response_util_1.errorResponse)(400, "Bạn không thể chỉnh sửa đánh giá của người khác", "FORBIDDEN");
        }
        let uploadedUrls = [];
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
        return (0, response_util_1.successResponse)(200, updatedReview, "Cập nhật đánh giá thành công");
    }
};
exports.UpdateShopReviewService = UpdateShopReviewService;
exports.UpdateShopReviewService = UpdateShopReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        supabase_service_1.SupabaseService])
], UpdateShopReviewService);
//# sourceMappingURL=updateReviewShop.service.js.map