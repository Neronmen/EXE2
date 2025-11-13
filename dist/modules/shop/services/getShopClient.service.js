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
exports.GetShopClientService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let GetShopClientService = class GetShopClientService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async getShopBySlug(slug, user) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { slug },
            select: {
                id: true,
                slug: true,
                brandName: true,
                companyName: true,
                businessPhone: true,
                businessAddress: true,
                description: true,
                shopAvatar: true,
                shopBanner: true,
                avgRating: true,
                totalReviews: true,
                totalFollowers: true,
                status: true,
                createdAt: true,
                user: {
                    select: { id: true, name: true, email: true, avatar: true },
                },
                ShopReview: {
                    take: 5,
                    orderBy: [
                        { rating: 'desc' },
                        { createdAt: 'desc' }
                    ],
                    select: {
                        id: true,
                        rating: true,
                        comment: true,
                        createdAt: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true,
                            },
                        },
                        ReviewShopImage: {
                            select: {
                                url: true,
                            },
                        },
                    },
                },
            },
        });
        if (!seller) {
            return (0, response_util_1.errorResponse)(400, 'Không tìm thấy shop');
        }
        const categories = await this.prisma.categoryShop.findMany({
            where: { sellerID: seller.id },
            include: {
                CategoryGlobal: { select: { id: true, name: true } },
                _count: {
                    select: { Product: true },
                },
            },
        });
        const result = categories.map((c) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            description: c.description,
            image: c.image,
            categoryGlobal: c.CategoryGlobal,
            totalProducts: c._count.Product,
        }));
        let isFollowed = false;
        if (user && user.id) {
            const followed = await this.prisma.shopFollower.findFirst({
                where: { sellerID: seller.id, userID: user.id },
                select: { id: true },
            });
            isFollowed = !!followed;
        }
        const resultFormatted = {
            ...seller,
            categoriesShop: result,
            isFollowed
        };
        return (0, response_util_1.successResponse)(200, resultFormatted, 'Lấy thông tin shop thành công');
    }
};
exports.GetShopClientService = GetShopClientService;
exports.GetShopClientService = GetShopClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], GetShopClientService);
//# sourceMappingURL=getShopClient.service.js.map