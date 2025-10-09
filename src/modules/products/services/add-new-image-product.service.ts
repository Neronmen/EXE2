import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { CreateProductDto } from "../dtos/create-product.dto";
import { slugify } from "transliteration";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";

@Injectable()
export class AddImageProductService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly supabaseService: SupabaseService
    ) { }

    async addImage(id: number, files, user) {
        const [product, seller] = await Promise.all([
            this.prisma.product.findUnique({
                where: { id ,isDeleted: false},
                include: { ProductImage: { select: { id: true } } },
            }),
            this.prisma.sellerProfile.findUnique({ where: { userID: user.id } }),
        ]);

        if (!seller) {
            return errorResponse(400, 'Người bán không tồn tại', 'SELLER_NOT_FOUND');
        }

        if (!product) {
            return errorResponse(400, 'Sản phẩm không tồn tại', 'PRODUCT_NOT_FOUND');
        }

        if (product.sellerID !== seller.id) {
            return errorResponse(400, 'Bạn không có quyền thêm ảnh cho sản phẩm này', 'FORBIDDEN');
        }

        if (!files || !files.images || files.images.length === 0) {
            return errorResponse(400, 'Không có ảnh để tải lên', 'NO_IMAGES_UPLOADED');
        }

        const currentImageCount = product.ProductImage.length;
        const newImageCount = files.images.length;

        if (currentImageCount + newImageCount > 10) {
            return errorResponse(
                400,
                `Sản phẩm đã có ${currentImageCount} ảnh, chỉ có thể thêm tối đa ${10 - currentImageCount} ảnh nữa`,
                'IMAGE_LIMIT_EXCEEDED',
            );
        }

        const uploadedUrls = await this.supabaseService.upload(files.images);

        const imageData = uploadedUrls.map((url) => ({
            productID: id,
            url,
            isMain: false,
        }));

        await this.prisma.$transaction(async (tx) => {
            await tx.productImage.createMany({ data: imageData });
        });
        return successResponse(200, 'Thêm ảnh sản phẩm thành công');
    }


}
