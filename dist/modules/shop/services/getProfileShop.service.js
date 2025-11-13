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
exports.GetProfileShopService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let GetProfileShopService = class GetProfileShopService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async getProfileShop(user) {
        const userID = user.id;
        if (user.roleID !== 4) {
            return (0, response_util_1.errorResponse)(400, "Bạn không phải là nhà bán hàng", "NOT_SHOP_ROLE");
        }
        const seller = await this.prisma.sellerProfile.findUnique({
            where: {
                userID
            },
            include: {
                user: {
                    select: { id: true, name: true, email: true, phone: true, avatar: true },
                },
                SellerKycDocument: {
                    select: {
                        id: true,
                        type: true,
                        url: true,
                    },
                }
            }
        });
        if (!seller) {
            return (0, response_util_1.errorResponse)(404, "Không tìm thấy hồ sơ cửa hàng", "SHOP_PROFILE_NOT_FOUND");
        }
        const formatted = {
            id: seller.id,
            companyName: seller.companyName,
            slug: seller.slug,
            brandName: seller.brandName,
            businessPhone: seller.businessPhone,
            businessAddress: seller.businessAddress,
            shopAvatar: seller.shopAvatar,
            shopBanner: seller.shopBanner,
            description: seller.description,
            status: seller.status,
            rejectionReason: seller.rejectionReason,
            avgRating: seller.avgRating,
            totalReviews: seller.totalReviews,
            totalFollowers: seller.totalFollowers,
            createdAt: seller.createdAt,
            updatedAt: seller.updatedAt,
            user: seller.user,
            sellerKycDocument: seller.SellerKycDocument
        };
        return (0, response_util_1.successResponse)(200, formatted, "Lấy hồ sơ cửa hàng thành công");
    }
};
exports.GetProfileShopService = GetProfileShopService;
exports.GetProfileShopService = GetProfileShopService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], GetProfileShopService);
//# sourceMappingURL=getProfileShop.service.js.map