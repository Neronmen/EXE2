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
exports.UpdateCategoryGlobalService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const transliteration_1 = require("transliteration");
const supabase_service_1 = require("../../common/subapase/supabase.service");
let UpdateCategoryGlobalService = class UpdateCategoryGlobalService {
    prisma;
    supabase;
    constructor(prisma, supabase) {
        this.prisma = prisma;
        this.supabase = supabase;
    }
    async UpdateCategoryGlobal(files, id, dto) {
        const existing = await this.prisma.categoryGlobal.findUnique({ where: { id } });
        if (!existing)
            return (0, response_util_1.errorResponse)(400, "Danh mục không tồn tại", "NOT_FOUND");
        let slug = existing.slug;
        if (dto.name && dto.name !== existing.name) {
            const slugBase = dto.name;
            slug = (0, transliteration_1.slugify)(slugBase, { lowercase: true, separator: '-' });
            const exists = await this.prisma.categoryGlobal.findUnique({ where: { slug } });
            if (exists) {
                slug = `${slug}-${Date.now()}`;
            }
        }
        let dataUpdate = {};
        if (files && files.image.length > 0 && existing.image !== files.image[0].originalname) {
            const avatar = await this.supabase.upload(files.image);
            dataUpdate.avatar = avatar[0];
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
        return (0, response_util_1.successResponse)(200, updated, "Cập nhật danh mục toàn cục thành công");
    }
};
exports.UpdateCategoryGlobalService = UpdateCategoryGlobalService;
exports.UpdateCategoryGlobalService = UpdateCategoryGlobalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        supabase_service_1.SupabaseService])
], UpdateCategoryGlobalService);
//# sourceMappingURL=update-category-global.service.js.map