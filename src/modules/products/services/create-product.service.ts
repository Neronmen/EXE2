import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { CreateProductDto } from "../dtos/create-product.dto";
import { slugify } from "transliteration";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";

@Injectable()
export class CreateProductService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly supabase: SupabaseService,
    ) { }

    async create(dto: CreateProductDto, images: any, user) {
        const categoryGlobal = await this.prisma.categoryGlobal.findUnique({
            where: { id: dto.categoryGlobalID },
        });
        if (!categoryGlobal) {
            return errorResponse(400, "Danh mục toàn cầu không tồn tại", "CATEGORY_GLOBAL_NOT_FOUND");
        }

        const seller = await this.prisma.sellerProfile.findFirst({ where: { userID: user.id } });
        if (!seller) {
            return errorResponse(400, "Người dùng không phải người bán", "USER_NOT_SELLER");
        }

        if (dto.categoryShopID) {
            const categoryShop = await this.prisma.categoryShop.findFirst({
                where: { id: dto.categoryShopID, sellerID: seller.id },
            });
            if (!categoryShop) {
                return errorResponse(400, "Danh mục cửa hàng không tồn tại", "CATEGORY_SHOP_NOT_FOUND");
            }
        }

        const profuctExist = await this.prisma.product.findFirst({
            where: {
                sellerID: seller.id,
                title: dto.title
            }
        })
        if (profuctExist) {
            return errorResponse(400, "Sản phẩm này đã tồn tại trong cửa hàng của bạn", "PRODUCT_ALREADY_EXISTS");
        }
        const slugBase = dto.title;
        let slug = slugify(slugBase, { lowercase: true, separator: '-' });
        const exists = await this.prisma.product.findFirst({ where: { slug, sellerID: seller.id } });
        if (exists) slug = `${slug}-${Date.now()}`;

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
                const validFiles = images.filter(
                    (file) => file && file.buffer && file.originalname
                );

                if (validFiles.length === 0) {
                    return errorResponse(400, 'Không có file hợp lệ được gửi lên');
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

        return successResponse(200, result, "Tạo sản phẩm thành công");
    }
}
