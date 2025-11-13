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
exports.ShopReviewService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let ShopReviewService = class ShopReviewService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getShopReviews(sellerID, pagination) {
        const shop = await this.prisma.sellerProfile.findUnique({ where: { id: sellerID } });
        if (!shop)
            return (0, response_util_1.errorResponse)(400, "Không tìm thấy shop", "SHOP_NOT_FOUND");
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
        return (0, response_util_1.successResponse)(200, {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            reviews,
        }, "Lấy danh sách đánh giá shop thành công");
    }
};
exports.ShopReviewService = ShopReviewService;
exports.ShopReviewService = ShopReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShopReviewService);
//# sourceMappingURL=getReviewShop.service.js.map