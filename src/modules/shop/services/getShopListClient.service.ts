import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetShopClientDto, ShopSortEnum } from "../dtos/get-shop-client.dto";


@Injectable()
export class GetShopListClientService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }
    // async getShopList(dto: GetShopClientDto) {
    //     const { page = 1, limit = 10, sort,  search } = dto;
    //     const skip = (page - 1) * limit;

    //     const where: any = {};
    //     // if (status) where.status = status;
    //     if (search)
    //         where.OR = [
    //             { brandName: { contains: search, mode: "insensitive" } },
    //             { companyName: { contains: search, mode: "insensitive" } },
    //         ];

    //     const orderBy =
    //         sort === ShopSortEnum.TOP_RATED
    //             ? { avgRating: "desc" as const }
    //             : sort === ShopSortEnum.OLDEST
    //                 ? { createdAt: "asc" as const }
    //                 : { createdAt: "desc" as const };

    //     const [shops, total] = await Promise.all([
    //         this.prisma.sellerProfile.findMany({
    //             where,
    //             orderBy,
    //             skip,
    //             take: limit,
    //             select: {
    //                 id: true,
    //                 slug: true,
    //                 brandName: true,
    //                 companyName: true,
    //                 shopAvatar: true,
    //                 avgRating: true,
    //                 totalReviews: true,
    //                 totalFollowers: true,
    //                 // status: true,
    //                 createdAt: true,
    //             },
    //         }),
    //         this.prisma.sellerProfile.count({ where }),
    //     ]);

    //     return successResponse(200, {
    //         total,
    //         page,
    //         limit,
    //         totalPages: Math.ceil(total / limit),
    //         shops,
    //     }, "Lấy danh sách shop thành công");
    // }

    async getShopList(dto: GetShopClientDto) {
        const { page = 1, limit = 10, sort, search } = dto;
        const skip = (page - 1) * limit;

        const orderBy =
            sort === ShopSortEnum.TOP_RATED
                ? { avgRating: "desc" as const }
                : sort === ShopSortEnum.OLDEST
                    ? { createdAt: "asc" as const }
                    : { createdAt: "desc" as const };

        if (search) {
            const shops = await this.prisma.$queryRaw<
                {
                    id: number;
                    slug: string;
                    brandName: string;
                    companyName: string;
                    shopAvatar: string | null;
                    avgRating: number | null;
                    totalReviews: number;
                    totalFollowers: number;
                    createdAt: Date;
                }[]
            >`
            SELECT *
            FROM "SellerProfile"
            WHERE unaccent("brandName") ILIKE unaccent(${`%${search}%`})
               OR unaccent("companyName") ILIKE unaccent(${`%${search}%`})
            ORDER BY ${orderBy.avgRating ? `"avgRating" ${orderBy.avgRating}` : `"createdAt" ${orderBy.createdAt}`}
            LIMIT ${limit} OFFSET ${skip};
        `;

            const totalResult = await this.prisma.$queryRaw<
                { count: number }[]
            >`
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

            return successResponse(
                200,
                {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                    shops : formattedShops,
                },
                "Lấy danh sách shop thành công"
            );
        }

        // 🧩 Nếu không có search thì dùng Prisma bình thường
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

        return successResponse(
            200,
            {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                shops,
            },
            "Lấy danh sách shop thành công"
        );
    }

}