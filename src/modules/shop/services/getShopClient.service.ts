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
    async getShopBySlug(slug: string, user) {
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
            return errorResponse(400, 'Không tìm thấy shop')
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
        }


        return successResponse(200, resultFormatted, 'Lấy thông tin shop thành công')
    }
}