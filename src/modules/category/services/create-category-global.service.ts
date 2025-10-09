import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { CreateCategoryGlobalDto } from "../dtos/category-global.dto";
import { slugify } from "transliteration";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";

@Injectable()
export class CreateCategoryGlobalService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly supabase: SupabaseService,

    ) { }

    async createCategoryGlobal(files: any, dto: CreateCategoryGlobalDto) {
        // Tạo slug nè
        const slugBase = dto.name;
        const slug = slugify(slugBase, { lowercase: true, separator: '-' });

        let finalSlug = slug;
        const exists = await this.prisma.categoryGlobal.findUnique({ where: { slug } });
        if (exists) {
            finalSlug = `${slug}-${Date.now()}`;
        }
        let dataUpdate: any = {};
        if (files && files.image.length > 0) {
            const avatar = await this.supabase.upload(files.image);
            dataUpdate.avatar = avatar[0]
        }

        const category = await this.prisma.categoryGlobal.create({
            data: {
                name: dto.name,
                description: dto.description,
                image: dataUpdate.avatar,
                slug,
            },
        });
        return successResponse(200, category, "Tạo danh mục toàn cục thành công");

    }
}
