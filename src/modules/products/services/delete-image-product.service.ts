import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { CreateProductDto } from "../dtos/create-product.dto";
import { slugify } from "transliteration";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";

@Injectable()
export class DeleteImageProductService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly supabaseService: SupabaseService
    ) { }

    async deleteImage(productId: number, imageId: number, user) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId, isDeleted: false },
            include: { ProductImage: true },
        });

        if (!product) return errorResponse(400, "Sản phẩm không tồn tại", "PRODUCT_NOT_FOUND");

        const seller = await this.prisma.sellerProfile.findUnique({
            where: { userID: user.id },
        });

        if (!seller) return errorResponse(400, "Người bán không tồn tại", "SELLER_NOT_FOUND");
        if (product.sellerID !== seller.id)
            return errorResponse(403, "Bạn không có quyền xóa ảnh sản phẩm này", "FORBIDDEN");

        const image = product.ProductImage.find((img) => img.id === imageId);
        if (!image) return errorResponse(400, "Ảnh không tồn tại", "IMAGE_NOT_FOUND");

        if (image.isMain && product.ProductImage.length > 1) {
            return errorResponse(400, "Không thể xóa ảnh chính. Hãy đặt ảnh khác làm chính trước", "CANNOT_DELETE_MAIN");
        }

        await this.prisma.productImage.delete({ where: { id: image.id } });

        return successResponse(200, "Xóa ảnh thành công");
    }


}
