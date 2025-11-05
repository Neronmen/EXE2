import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { UpdateCategoryGlobalDto } from "../dtos/category-global.dto";
import { slugify } from "transliteration";
import e from "express";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";

@Injectable()
export class UpdateCategoryGlobalService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly supabase: SupabaseService,

    ) { }


    async UpdateCategoryGlobal(files: any, id: number, dto: UpdateCategoryGlobalDto) {
        const existing = await this.prisma.categoryGlobal.findUnique({ where: { id } });
        if (!existing) return errorResponse(400, "Danh mục không tồn tại", "NOT_FOUND");
        let slug = existing.slug;
        if (dto.name && dto.name !== existing.name) {
            // Tạo slug nè
            const slugBase = dto.name;
            slug = slugify(slugBase, { lowercase: true, separator: '-' });

            const exists = await this.prisma.categoryGlobal.findUnique({ where: { slug } });
            if (exists) {
                slug = `${slug}-${Date.now()}`;
            }
        }
        let dataUpdate: any = {};
        if (files && files.image.length > 0 && existing.image !== files.image[0].originalname) {
            const avatar = await this.supabase.upload(files.image);
            dataUpdate.avatar = avatar[0]
        }

        const updated = await this.prisma.categoryGlobal.update({
            where: { id },
            data: {
                name: dto.name ?? existing.name,
                image: dataUpdate.avatar ?? existing.image,
                description: dto.description ?? existing.description,
                slug,
            },
        });
        return successResponse(200, updated, "Cập nhật danh mục toàn cục thành công");
    }

}
