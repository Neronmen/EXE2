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
exports.CreateCategoryShopService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const transliteration_1 = require("transliteration");
const supabase_service_1 = require("../../common/subapase/supabase.service");
let CreateCategoryShopService = class CreateCategoryShopService {
    prisma;
    supabase;
    constructor(prisma, supabase) {
        this.prisma = prisma;
        this.supabase = supabase;
    }
    async createCategoryShop(files, dto, user) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { userID: user.id },
        });
        if (!seller)
            return (0, response_util_1.errorResponse)(400, "Bạn chưa có shop", "NO_SHOP");
        const slugBase = dto.name;
        const slug = (0, transliteration_1.slugify)(slugBase, { lowercase: true, separator: '-' });
        let finalSlug = slug;
        const exists = await this.prisma.categoryShop.findUnique({ where: { slug, sellerID: seller.id } });
        if (exists) {
            finalSlug = `${slug}-${Date.now()}`;
        }
        let categoryGlobalId = null;
        if (dto.categoryGlobalId) {
            categoryGlobalId = Number(dto.categoryGlobalId);
            const categoryGlobal = await this.prisma.categoryGlobal.findUnique({
                where: { id: dto.categoryGlobalId },
            });
            if (!categoryGlobal) {
                return (0, response_util_1.errorResponse)(400, "Danh mục toàn cầu không tồn tại", "CATEGORY_GLOBAL_NOT_FOUND");
            }
        }
        let dataUpdate = {};
        if (files && files.image.length > 0) {
            const avatar = await this.supabase.upload(files.image);
            dataUpdate.avatar = avatar[0];
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
        return (0, response_util_1.successResponse)(200, category, "Tạo danh mục shop thành công");
    }
};
exports.CreateCategoryShopService = CreateCategoryShopService;
exports.CreateCategoryShopService = CreateCategoryShopService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        supabase_service_1.SupabaseService])
], CreateCategoryShopService);
//# sourceMappingURL=create-category-shop.service.js.map