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
exports.DeleteReviewService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let DeleteReviewService = class DeleteReviewService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async deleteReview(reviewID, user) {
        const review = await this.prisma.shopReview.findUnique({
            where: { id: reviewID },
        });
        if (!review) {
            return (0, response_util_1.errorResponse)(400, "Không tìm thấy đánh giá này", "REVIEW_NOT_FOUND");
        }
        if (review.userID !== user.id) {
            return (0, response_util_1.errorResponse)(400, "Bạn không thể xóa đánh giá của người khác", "FORBIDDEN");
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
        return (0, response_util_1.successResponse)(200, "Xóa đánh giá cửa hàng thành công");
    }
};
exports.DeleteReviewService = DeleteReviewService;
exports.DeleteReviewService = DeleteReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DeleteReviewService);
//# sourceMappingURL=deleteReviewShop.service.js.map