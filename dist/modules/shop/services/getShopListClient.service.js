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
exports.GetShopListClientService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const get_shop_client_dto_1 = require("../dtos/get-shop-client.dto");
let GetShopListClientService = class GetShopListClientService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async getShopList(dto) {
        const { page = 1, limit = 10, sort, search } = dto;
        const skip = (page - 1) * limit;
        const orderBy = sort === get_shop_client_dto_1.ShopSortEnum.TOP_RATED
            ? { avgRating: "desc" }
            : sort === get_shop_client_dto_1.ShopSortEnum.OLDEST
                ? { createdAt: "asc" }
                : { createdAt: "desc" };
        if (search) {
            const shops = await this.prisma.$queryRaw `
            SELECT *
            FROM "SellerProfile"
            WHERE unaccent("brandName") ILIKE unaccent(${`%${search}%`})
               OR unaccent("companyName") ILIKE unaccent(${`%${search}%`})
            ORDER BY ${orderBy.avgRating ? `"avgRating" ${orderBy.avgRating}` : `"createdAt" ${orderBy.createdAt}`}
            LIMIT ${limit} OFFSET ${skip};
        `;
            const totalResult = await this.prisma.$queryRaw `
            SELECT COUNT(*)::int AS count
            FROM "SellerProfile"
            WHERE unaccent("brandName") ILIKE unaccent(${`%${search}%`})
               OR unaccent("companyName") ILIKE unaccent(${`%${search}%`});
        `;
            const total = totalResult[0]?.count ?? 0;
            const formattedShops = shops.map((s) => ({
                id: s.id,
                slug: s.slug,
                brandName: s.brandName,
                companyName: s.companyName,
                shopAvatar: s.shopAvatar,
                avgRating: Number(s.avgRating) || 0,
                totalReviews: Number(s.totalReviews) || 0,
                totalFollowers: Number(s.totalFollowers) || 0,
                createdAt: s.createdAt,
            }));
            return (0, response_util_1.successResponse)(200, {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                shops: formattedShops,
            }, "Lấy danh sách shop thành công");
        }
        const [shops, total] = await Promise.all([
            this.prisma.sellerProfile.findMany({
                where: {},
                orderBy,
                skip,
                take: limit,
                select: {
                    id: true,
                    slug: true,
                    brandName: true,
                    companyName: true,
                    shopAvatar: true,
                    avgRating: true,
                    totalReviews: true,
                    totalFollowers: true,
                    createdAt: true,
                },
            }),
            this.prisma.sellerProfile.count(),
        ]);
        return (0, response_util_1.successResponse)(200, {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            shops,
        }, "Lấy danh sách shop thành công");
    }
};
exports.GetShopListClientService = GetShopListClientService;
exports.GetShopListClientService = GetShopListClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], GetShopListClientService);
//# sourceMappingURL=getShopListClient.service.js.map