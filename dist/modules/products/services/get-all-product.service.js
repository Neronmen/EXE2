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
exports.GetAllProductService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let GetAllProductService = class GetAllProductService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll(params, user) {
        const { page = 1, limit = 20, search, categoryGlobalID, categoryShopID, isActive = false } = params;
        const skip = (page - 1) * limit;
        const seller = await this.prisma.sellerProfile.findFirst({ where: { userID: user.id } });
        if (!seller) {
            return (0, response_util_1.errorResponse)(400, "Người dùng không phải người bán", "USER_NOT_SELLER");
        }
        const where = { sellerID: seller.id, isDeleted: false };
        if (isActive !== undefined) {
            console.log(isActive);
            where.isActive = isActive;
        }
        if (search) {
            where.OR = [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ];
        }
        if (categoryGlobalID) {
            where.categoryGlobalID = categoryGlobalID;
        }
        if (categoryShopID)
            where.categoryShopID = categoryShopID;
        const [products, total] = await this.prisma.$transaction([
            this.prisma.product.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    unit: true,
                    soldCount: true,
                    viewCount: true,
                    totalReviews: true,
                    avgRating: true,
                    basePrice: true,
                    stock: true,
                    region: true,
                    categoryGlobalID: true,
                    categoryShopID: true,
                    isActive: true,
                    createdAt: true,
                    updatedAt: true,
                    ProductImage: {
                        where: { isMain: true },
                        select: { url: true, isMain: true },
                    },
                    PricingTier: {
                        select: { minQty: true, price: true },
                        orderBy: { minQty: "asc" },
                    },
                },
            }),
            this.prisma.product.count({ where }),
        ]);
        const pagination = { page, limit, total, totalPages: Math.ceil(total / limit) };
        const result = {
            products,
            pagination,
        };
        return (0, response_util_1.successResponse)(200, result, "Lấy danh sách sản phẩm thành công");
    }
};
exports.GetAllProductService = GetAllProductService;
exports.GetAllProductService = GetAllProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GetAllProductService);
//# sourceMappingURL=get-all-product.service.js.map