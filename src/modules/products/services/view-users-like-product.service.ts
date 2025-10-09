import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { errorResponse, successResponse } from "src/common/utils/response.util";

@Injectable()
export class ViewUserLikeProductService {
    constructor(private readonly prisma: PrismaService) { }

    async viewUserLikeProduct(productId: number, userId: number) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { userID: userId },
        });
        if (!seller) return errorResponse(400, "Người dùng không phải seller", "USER_NOT_SELLER");
        const product = await this.prisma.product.findFirst({
            where: { id: productId, sellerID: seller.id, isDeleted: false },
            select: {
                id: true,
            }
        })
        if (!product) return errorResponse(400, "Sản phẩm không tồn tại", "PRODUCT_NOT_FOUND");

        const likes = await this.prisma.productLike.findMany({
            where: { productID: productId },
            select: {
                user: { select: { id: true, name: true, avatar: true } },
            },
            orderBy: { createdAt: "desc" },
        })
        return successResponse(200, likes, "Lấy danh sách người dùng thích sản phẩm thành công");
    };

}