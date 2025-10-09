import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { CreateCategoryShopDto } from "../dtos/category-shop.dto";
import { slugify } from "transliteration";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";

@Injectable()
export class CreateCategoryShopService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly supabase: SupabaseService,

    ) { }

    async createCategoryShop(files: any, dto: CreateCategoryShopDto, user) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { userID: user.id },
        });

        if (!seller) return errorResponse(400, "Bạn chưa có shop", "NO_SHOP");

        const slugBase = dto.name;
        const slug = slugify(slugBase, { lowercase: true, separator: '-' });

        let finalSlug = slug;
        const exists = await this.prisma.categoryShop.findUnique({ where: { slug, sellerID: seller.id } });
        if (exists) {
            finalSlug = `${slug}-${Date.now()}`;
        }

        let categoryGlobalId: number | null = null;
        if (dto.categoryGlobalId) {
            categoryGlobalId = Number(dto.categoryGlobalId);
            const categoryGlobal = await this.prisma.categoryGlobal.findUnique({
                where: { id: dto.categoryGlobalId },
            });
            if (!categoryGlobal) {
                return errorResponse(400, "Danh mục toàn cầu không tồn tại", "CATEGORY_GLOBAL_NOT_FOUND");
            }
        }

        let dataUpdate: any = {};
        if (files && files.image.length > 0) {
            const avatar = await this.supabase.upload(files.image);
            dataUpdate.avatar = avatar[0]
        }

        const category = await this.prisma.categoryShop.create({
            data: {
                sellerID: seller.id,
                name: dto.name,
                description: dto.description,
                image: dataUpdate.avatar,
                categoryGlobalId,
                slug,
            },
        });

        return successResponse(200, category, "Tạo danh mục shop thành công");
    }
}
