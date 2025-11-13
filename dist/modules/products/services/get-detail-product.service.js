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
exports.SellerProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const response_util_1 = require("../../../common/utils/response.util");
let SellerProductService = class SellerProductService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProductDetail(productId, userId) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { userID: userId },
        });
        if (!seller)
            return (0, response_util_1.errorResponse)(400, "Người dùng không phải seller", "USER_NOT_SELLER");
        const product = await this.prisma.product.findFirst({
            where: { id: productId, sellerID: seller.id, isDeleted: false },
            include: {
                CategoryGlobal: { select: { id: true, name: true } },
                CategoryShop: { select: { id: true, name: true } },
                ProductImage: { select: { id: true, url: true, isMain: true }, orderBy: { isMain: "desc" } },
                PricingTier: { select: { id: true, minQty: true, price: true }, orderBy: { minQty: "asc" } },
                _count: {
                    select: { ProductLike: true },
                },
                ProductReview: {
                    take: 10,
                    orderBy: { createdAt: "desc" },
                    select: {
                        id: true,
                        rating: true,
                        content: true,
                        createdAt: true,
                        user: { select: { id: true, name: true, avatar: true } },
                        ReviewProductImage: { select: { url: true } },
                    },
                },
                ProductComment: {
                    take: 10,
                    orderBy: { createdAt: "desc" },
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        user: { select: { id: true, name: true, avatar: true } },
                        ProductCommentImage: { select: { url: true } },
                        _count: {
                            select: { ProductCommentLike: true }
                        }
                    },
                },
            },
        });
        if (!product)
            return (0, response_util_1.errorResponse)(404, "Sản phẩm không tồn tại", "PRODUCT_NOT_FOUND");
        return (0, response_util_1.successResponse)(200, product, "Lấy chi tiết sản phẩm thành công");
    }
};
exports.SellerProductService = SellerProductService;
exports.SellerProductService = SellerProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SellerProductService);
//# sourceMappingURL=get-detail-product.service.js.map