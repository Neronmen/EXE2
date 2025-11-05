import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { CreateProductDto } from "../dtos/create-product.dto";
import { slugify } from "transliteration";

@Injectable()
export class ChangeStatusProductService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async toggleStatus(productId: number, user) {
        const [product, seller] = await Promise.all([
            this.prisma.product.findUnique({
                where: { id: productId, isDeleted: false },
                select: { id: true, isActive: true, sellerID: true },
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
            return errorResponse(400, 'Bạn không có quyền đổi trạng thái  sản phẩm này', 'FORBIDDEN');
        }

        const updated = await this.prisma.product.update({
            where: { id: productId },
            data: { isActive: !product.isActive },
        });
        return successResponse(200, "Cập nhật trạng thái thành công");
    }


}
