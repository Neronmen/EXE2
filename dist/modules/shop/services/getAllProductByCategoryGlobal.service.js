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
exports.GetAllProductByCategoryGlobalClientService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let GetAllProductByCategoryGlobalClientService = class GetAllProductByCategoryGlobalClientService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll(params, categoryGlobalID) {
        const { page = 1, limit = 20, search } = params;
        const skip = (page - 1) * limit;
        const categoryGlobal = await this.prisma.categoryGlobal.findUnique({
            where: { id: categoryGlobalID },
            select: { id: true },
        });
        if (!categoryGlobal) {
            return (0, response_util_1.errorResponse)(400, 'Không tìm thấy danh mục');
        }
        let where = { categoryGlobalID, isDeleted: false, isActive: true };
        if (search) {
            where.OR = [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ];
        }
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
                    basePrice: true,
                    stock: true,
                    minOrderQty: true,
                    isActive: true,
                    CategoryGlobal: { select: { id: true, name: true } },
                    CategoryShop: { select: { id: true, name: true } },
                    SellerProfile: { select: { id: true, companyName: true, slug: true, shopAvatar: true, brandName: true } },
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
            this.prisma.product.count({
                where,
            }),
        ]);
        const pagination = { page, limit, total, totalPages: Math.ceil(total / limit) };
        const result = {
            products,
            pagination,
        };
        return (0, response_util_1.successResponse)(200, result, "Lấy danh sách sản phẩm theo danh mục toàn cục thành công");
    }
};
exports.GetAllProductByCategoryGlobalClientService = GetAllProductByCategoryGlobalClientService;
exports.GetAllProductByCategoryGlobalClientService = GetAllProductByCategoryGlobalClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GetAllProductByCategoryGlobalClientService);
//# sourceMappingURL=getAllProductByCategoryGlobal.service.js.map