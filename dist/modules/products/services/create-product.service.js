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
exports.CreateProductService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const transliteration_1 = require("transliteration");
const supabase_service_1 = require("../../common/subapase/supabase.service");
let CreateProductService = class CreateProductService {
    prisma;
    supabase;
    constructor(prisma, supabase) {
        this.prisma = prisma;
        this.supabase = supabase;
    }
    async create(dto, images, user) {
        const categoryGlobal = await this.prisma.categoryGlobal.findUnique({
            where: { id: dto.categoryGlobalID },
        });
        if (!categoryGlobal) {
            return (0, response_util_1.errorResponse)(400, "Danh mục toàn cầu không tồn tại", "CATEGORY_GLOBAL_NOT_FOUND");
        }
        const seller = await this.prisma.sellerProfile.findFirst({ where: { userID: user.id } });
        if (!seller) {
            return (0, response_util_1.errorResponse)(400, "Người dùng không phải người bán", "USER_NOT_SELLER");
        }
        if (dto.categoryShopID) {
            const categoryShop = await this.prisma.categoryShop.findFirst({
                where: { id: dto.categoryShopID, sellerID: seller.id },
            });
            if (!categoryShop) {
                return (0, response_util_1.errorResponse)(400, "Danh mục cửa hàng không tồn tại", "CATEGORY_SHOP_NOT_FOUND");
            }
        }
        const profuctExist = await this.prisma.product.findFirst({
            where: {
                sellerID: seller.id,
                title: dto.title
            }
        });
        if (profuctExist) {
            return (0, response_util_1.errorResponse)(400, "Sản phẩm này đã tồn tại trong cửa hàng của bạn", "PRODUCT_ALREADY_EXISTS");
        }
        const slugBase = dto.title;
        let slug = (0, transliteration_1.slugify)(slugBase, { lowercase: true, separator: '-' });
        const exists = await this.prisma.product.findFirst({ where: { slug, sellerID: seller.id } });
        if (exists)
            slug = `${slug}-${Date.now()}`;
        const result = await this.prisma.$transaction(async (prisma) => {
            const product = await prisma.product.create({
                data: {
                    sellerID: seller.id,
                    categoryGlobalID: dto.categoryGlobalID,
                    categoryShopID: dto.categoryShopID ?? null,
                    title: dto.title,
                    slug,
                    description: dto.description ?? null,
                    origin: dto.origin ?? null,
                    brand: dto.brand ?? null,
                    unit: dto.unit ?? null,
                    region: dto.region ?? [],
                    condition: dto.condition ?? [],
                    season: dto.season ?? [],
                    storageInstructions: dto.storageInstructions ?? null,
                    usageInstructions: dto.usageInstructions ?? null,
                    certifications: dto.certifications ?? null,
                    stock: dto.stock ?? 0,
                    minOrderQty: dto.minOrderQty ?? 1,
                    basePrice: dto.basePrice,
                    isActive: dto.isActive ?? true,
                    createdBy: user.id,
                },
            });
            if (images && images?.length) {
                const validFiles = images.filter((file) => file && file.buffer && file.originalname);
                if (validFiles.length === 0) {
                    return (0, response_util_1.errorResponse)(400, 'Không có file hợp lệ được gửi lên');
                }
                const uploadedUrls = await this.supabase.upload(images);
                const imageData = uploadedUrls.map((url, index) => ({
                    productID: product.id,
                    url,
                    isMain: index === 0,
                }));
                await prisma.productImage.createMany({ data: imageData });
            }
            if (dto.PricingTier?.length) {
                const pricingData = dto.PricingTier.map((t) => ({
                    productID: product.id,
                    minQty: t.minQty,
                    price: t.price,
                }));
                await prisma.pricingTier.createMany({ data: pricingData });
            }
            return product;
        });
        return (0, response_util_1.successResponse)(200, result, "Tạo sản phẩm thành công");
    }
};
exports.CreateProductService = CreateProductService;
exports.CreateProductService = CreateProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        supabase_service_1.SupabaseService])
], CreateProductService);
//# sourceMappingURL=create-product.service.js.map