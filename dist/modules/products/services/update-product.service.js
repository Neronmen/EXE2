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
exports.UpdateProductService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const transliteration_1 = require("transliteration");
const supabase_service_1 = require("../../common/subapase/supabase.service");
let UpdateProductService = class UpdateProductService {
    prisma;
    supabase;
    constructor(prisma, supabase) {
        this.prisma = prisma;
        this.supabase = supabase;
    }
    async updateProduct(productId, dto, userId) {
        const seller = await this.prisma.sellerProfile.findUnique({ where: { userID: userId } });
        if (!seller)
            return (0, response_util_1.errorResponse)(400, "Người dùng không phải seller", "USER_NOT_SELLER");
        const product = await this.prisma.product.findFirst({ where: { id: productId, sellerID: seller.id, isDeleted: false } });
        if (!product)
            return (0, response_util_1.errorResponse)(404, "Sản phẩm không tồn tại", "PRODUCT_NOT_FOUND");
        if (dto.categoryGlobalID) {
            const catGlobal = await this.prisma.categoryGlobal.findUnique({ where: { id: dto.categoryGlobalID } });
            if (!catGlobal)
                return (0, response_util_1.errorResponse)(400, "Danh mục toàn cầu không tồn tại", "CATEGORY_GLOBAL_NOT_FOUND");
        }
        if (dto.categoryShopID) {
            const catShop = await this.prisma.categoryShop.findFirst({ where: { id: dto.categoryShopID, sellerID: seller.id } });
            if (!catShop)
                return (0, response_util_1.errorResponse)(400, "Danh mục shop không tồn tại", "CATEGORY_SHOP_NOT_FOUND");
        }
        const updateData = { updatedBy: userId };
        if (dto.categoryGlobalID !== undefined)
            updateData.categoryGlobalID = dto.categoryGlobalID;
        if (dto.categoryShopID !== undefined)
            updateData.categoryShopID = dto.categoryShopID;
        if (dto.title !== undefined) {
            const profuctExist = await this.prisma.product.findFirst({
                where: {
                    sellerID: seller.id,
                    title: dto.title,
                    NOT: { id: product.id }
                }
            });
            if (profuctExist) {
                return (0, response_util_1.errorResponse)(400, "Tên sản phẩm này đã được sử dụng. Vui lòng chọn tên khác.", "PRODUCT_TITLE_DUPLICATE");
            }
            updateData.title = dto.title;
            let newSlug = (0, transliteration_1.slugify)(dto.title, { lowercase: true, separator: '-' });
            const existing = await this.prisma.product.findFirst({
                where: {
                    slug: newSlug,
                    sellerID: seller.id,
                    NOT: { id: productId },
                },
            });
            if (existing) {
                newSlug = `${newSlug}-${Date.now()}`;
            }
            updateData.slug = newSlug;
        }
        if (dto.description !== undefined)
            updateData.description = dto.description;
        if (dto.origin !== undefined)
            updateData.origin = dto.origin;
        if (dto.brand !== undefined)
            updateData.brand = dto.brand;
        if (dto.unit !== undefined)
            updateData.unit = dto.unit;
        if (dto.region !== undefined)
            updateData.region = dto.region;
        if (dto.condition !== undefined)
            updateData.condition = dto.condition;
        if (dto.season !== undefined)
            updateData.season = dto.season;
        if (dto.storageInstructions !== undefined)
            updateData.storageInstructions = dto.storageInstructions;
        if (dto.usageInstructions !== undefined)
            updateData.usageInstructions = dto.usageInstructions;
        if (dto.certifications !== undefined)
            updateData.certifications = dto.certifications;
        if (dto.stock !== undefined)
            updateData.stock = dto.stock;
        if (dto.minOrderQty !== undefined)
            updateData.minOrderQty = dto.minOrderQty;
        if (dto.basePrice !== undefined)
            updateData.basePrice = dto.basePrice;
        if (dto.isActive !== undefined)
            updateData.isActive = dto.isActive;
        await this.prisma.$transaction(async (prisma) => {
            await prisma.product.update({
                where: { id: productId },
                data: updateData,
            });
            if (dto.PricingTier) {
                await prisma.pricingTier.deleteMany({ where: { productID: productId } });
                await prisma.pricingTier.createMany({
                    data: dto.PricingTier.map(t => ({ productID: productId, minQty: t.minQty, price: t.price })),
                });
            }
        });
        return (0, response_util_1.successResponse)(200, "Cập nhật sản phẩm thành công");
    }
};
exports.UpdateProductService = UpdateProductService;
exports.UpdateProductService = UpdateProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        supabase_service_1.SupabaseService])
], UpdateProductService);
//# sourceMappingURL=update-product.service.js.map