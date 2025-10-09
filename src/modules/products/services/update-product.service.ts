import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { CreateProductDto } from "../dtos/create-product.dto";
import { slugify } from "transliteration";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
import { UpdateProductDto } from "../dtos/update-product.dto";
import type { File as MulterFile } from "multer";


@Injectable()
export class UpdateProductService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly supabase: SupabaseService,
    ) { }

    async updateProduct(productId: number, dto: UpdateProductDto, userId: number) {
        // 1. Kiểm tra seller
        const seller = await this.prisma.sellerProfile.findUnique({ where: { userID: userId } });
        if (!seller) return errorResponse(400, "Người dùng không phải seller", "USER_NOT_SELLER");

        // 2. Lấy product
        const product = await this.prisma.product.findFirst({ where: { id: productId, sellerID: seller.id, isDeleted: false } });
        if (!product) return errorResponse(404, "Sản phẩm không tồn tại", "PRODUCT_NOT_FOUND");

        // 3. Kiểm tra category nếu update
        if (dto.categoryGlobalID) {
            const catGlobal = await this.prisma.categoryGlobal.findUnique({ where: { id: dto.categoryGlobalID } });
            if (!catGlobal) return errorResponse(400, "Danh mục toàn cầu không tồn tại", "CATEGORY_GLOBAL_NOT_FOUND");
        }
        if (dto.categoryShopID) {
            const catShop = await this.prisma.categoryShop.findFirst({ where: { id: dto.categoryShopID, sellerID: seller.id } });
            if (!catShop) return errorResponse(400, "Danh mục shop không tồn tại", "CATEGORY_SHOP_NOT_FOUND");
        }

        // 4. Transaction

        const updateData: any = { updatedBy: userId };

        if (dto.categoryGlobalID !== undefined) updateData.categoryGlobalID = dto.categoryGlobalID;
        if (dto.categoryShopID !== undefined) updateData.categoryShopID = dto.categoryShopID;
        if (dto.title !== undefined) {
            updateData.title = dto.title;

            // Tạo slug mới
            let newSlug = slugify(dto.title, { lowercase: true, separator: '-' });

            // Kiểm tra xem slug đã tồn tại cho seller này chưa
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
        if (dto.description !== undefined) updateData.description = dto.description;
        if (dto.origin !== undefined) updateData.origin = dto.origin;
        if (dto.brand !== undefined) updateData.brand = dto.brand;
        if (dto.unit !== undefined) updateData.unit = dto.unit;
        if (dto.region !== undefined) updateData.region = dto.region;
        if (dto.condition !== undefined) updateData.condition = dto.condition;
        if (dto.season !== undefined) updateData.season = dto.season;
        if (dto.storageInstructions !== undefined) updateData.storageInstructions = dto.storageInstructions;
        if (dto.usageInstructions !== undefined) updateData.usageInstructions = dto.usageInstructions;
        if (dto.certifications !== undefined) updateData.certifications = dto.certifications;
        if (dto.stock !== undefined) updateData.stock = dto.stock;
        if (dto.minOrderQty !== undefined) updateData.minOrderQty = dto.minOrderQty;
        if (dto.basePrice !== undefined) updateData.basePrice = dto.basePrice;
        if (dto.isActive !== undefined) updateData.isActive = dto.isActive;
        await this.prisma.$transaction(async (prisma) => {
            // Update product
            await prisma.product.update({
                where: { id: productId },
                data: updateData,
            });

            // Update pricing tier
            if (dto.PricingTier) {
                await prisma.pricingTier.deleteMany({ where: { productID: productId } });
                await prisma.pricingTier.createMany({
                    data: dto.PricingTier.map(t => ({ productID: productId, minQty: t.minQty, price: t.price })),
                });
            }

            // // Update images nếu có
            // if (images && images.length > 0) {
            //     const imageData = images.map((file, index) => ({
            //         productID: productId,
            //         url: file.path,
            //         isMain: index === 0,
            //     }));
            //     await prisma.productImage.createMany({ data: imageData });
            // }
        });

        return successResponse(200, "Cập nhật sản phẩm thành công");
    }

}
