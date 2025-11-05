import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
import { UpdateCategoryShopDto } from "../dtos/category-shop.dto";
import { slugify } from "transliteration";

@Injectable()
export class UpdateCategoryShopService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly supabase: SupabaseService,

    ) { }


    async UpdateCategoryShop(files: any, id: number, dto: UpdateCategoryShopDto) {
        const existing = await this.prisma.categoryShop.findUnique({ where: { id } });
        if (!existing) return errorResponse(400, "Danh mục không tồn tại", "NOT_FOUND");

        // Tạo slug nè
        let slug = existing.slug;
        if (dto.name && dto.name !== existing.name) {
            const slugBase = dto.name;
            slug = slugify(slugBase, { lowercase: true, separator: '-' });

            const exists = await this.prisma.categoryShop.findUnique({ where: { slug } });
            if (exists) {
                slug = `${slug}-${Date.now()}`;
            }
        }


        let dataUpdate: any = {};
        if (files && files.image.length > 0 && existing.image !== files.image[0].originalname) {
            const avatar = await this.supabase.upload(files.image);
            dataUpdate.avatar = avatar[0]
        }

        let categoryGlobalId: number | null = existing.categoryGlobalId;
        if ("categoryGlobalId" in dto) {
            const incoming: any = dto.categoryGlobalId;

            if (incoming === null || incoming === undefined || incoming === "" || incoming === 0) {
                categoryGlobalId = null;
            } else {
                const parsedId = Number(incoming);
                if (isNaN(parsedId)) {
                    return errorResponse(400, "ID danh mục toàn cầu không hợp lệ", "INVALID_CATEGORY_GLOBAL_ID");
                }
                const exists = await this.prisma.categoryGlobal.findUnique({
                    where: { id: parsedId },
                    select: { id: true },
                });

                if (!exists) {
                    return errorResponse(400, "Danh mục toàn cầu không tồn tại", "CATEGORY_GLOBAL_NOT_FOUND");
                }

                categoryGlobalId = parsedId;
            }
        }
        const updated = await this.prisma.categoryShop.update({
            where: { id },
            data: {
                name: dto.name ?? existing.name,
                image: dataUpdate.avatar ?? existing.image,
                description: dto.description ?? existing.description,
                slug,
                categoryGlobalId,
            },
        });
        return successResponse(200, updated, "Cập nhật danh mục trong shop thành công");

    }

}
