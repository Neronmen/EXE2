import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class GetProfileShopService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }
    async getProfileShop(user) {
        const userID = user.id;
        if (user.roleID !== 4) {
            return errorResponse(400, "Bạn không phải là nhà bán hàng", "NOT_SHOP_ROLE");
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
        })
        if (!seller) {
            return errorResponse(404, "Không tìm thấy hồ sơ cửa hàng", "SHOP_PROFILE_NOT_FOUND");
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
        return successResponse(200, formatted, "Lấy hồ sơ cửa hàng thành công")
    }
}