import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { CreateCategoryGlobalDto, FilterCategoryGlobalDto } from "../dtos/category-global.dto";
import { slugify } from "transliteration";

@Injectable()
export class GetListCategoryGlobalService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    // async getListCategoryGlobal(filter: FilterCategoryGlobalDto) {
    //     const { search, page = "1", limit = "10" } = filter;
    //     const skip = (parseInt(page) - 1) * parseInt(limit);
    //     const take = parseInt(limit);

    //     const where: any = search
    //         ? { name: { contains: search, mode: "insensitive" } }
    //         : {};



    //     const [items, total] = await Promise.all([
    //         this.prisma.categoryGlobal.findMany({
    //             where,
    //             skip,
    //             take,
    //         }),
    //         this.prisma.categoryGlobal.count({ where }),
    //     ]);

    //     return successResponse(200, {
    //         total,
    //         page: +page,
    //         limit: +limit,
    //         totalPages: Math.ceil(total / +limit),
    //         items,
    //     }, "Lấy danh sách danh mục toàn cục thành công");
    // }

    async getListCategoryGlobal(filter: FilterCategoryGlobalDto) {
        const { search, page = "1", limit = "10" } = filter;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);

        let items: any[] = [];
        let total = 0;

        if (search) {
            const searchTerm = `%${search}%`;
            items = await this.prisma.$queryRaw<
                {
                    id: number;
                    name: string;
                    slug: string;
                    createdAt: Date;
                }[]
            >`
                SELECT *
                FROM "CategoryGlobal"
                WHERE unaccent("name") ILIKE unaccent(${searchTerm})
                LIMIT ${take} OFFSET ${skip};
                `;

            const totalResult = await this.prisma.$queryRaw<{ count: number }[]>`
                SELECT COUNT(*)::int AS count
                FROM "CategoryGlobal"
                WHERE unaccent("name") ILIKE unaccent(${searchTerm});
                `;

            total = totalResult[0]?.count ?? 0;
        } else {
            [items, total] = await Promise.all([
                this.prisma.categoryGlobal.findMany({
                    skip,
                    take,
                }),
                this.prisma.categoryGlobal.count(),
            ]);
        }

        return successResponse(200, {
            total,
            page: +page,
            limit: +limit,
            totalPages: Math.ceil(total / +limit),
            items,
        }, "Lấy danh sách danh mục toàn cục thành công");
    }

}
