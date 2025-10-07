import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class GetShopClientService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }
    async getShopBySlug(slug: string) {
        const shop = await this.prisma.sellerProfile.findUnique({
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

            },
        });
        if (!shop) {
            return errorResponse(400, 'Không tìm thấy shop')
        }

        return successResponse(200, shop, 'Lấy thông tin shop thành công')
    }
}