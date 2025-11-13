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
exports.CreateShopReviewService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const supabase_service_1 = require("../../common/subapase/supabase.service");
const response_util_1 = require("../../../common/utils/response.util");
let CreateShopReviewService = class CreateShopReviewService {
    prisma;
    supabase;
    constructor(prisma, supabase) {
        this.prisma = prisma;
        this.supabase = supabase;
    }
    async createReview(dto, files, user) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { id: dto.sellerID },
        });
        if (seller?.userID === user.id) {
            return (0, response_util_1.errorResponse)(400, "Bạn không thể tự đánh giá chính cửa hàng của mình", "CANNOT_FOLLOW_OWN_SHOP");
        }
        if (!seller)
            return (0, response_util_1.errorResponse)(400, 'Shop không tồn tại', 'SHOP_NOT_FOUND');
        const existed = await this.prisma.shopReview.findFirst({
            where: { userID: user.id, sellerID: dto.sellerID },
        });
        if (existed)
            return (0, response_util_1.errorResponse)(400, 'Bạn đã đánh giá shop này rồi', 'ALREADY_REVIEWED');
        let uploadedUrls = [];
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
        return (0, response_util_1.successResponse)(200, review, 'Đánh giá shop thành công');
    }
};
exports.CreateShopReviewService = CreateShopReviewService;
exports.CreateShopReviewService = CreateShopReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        supabase_service_1.SupabaseService])
], CreateShopReviewService);
//# sourceMappingURL=createReviewShop.service.js.map