import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class LikeAndUnlikeProductService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }
    async likeProduct(productID: number, user) {
        const like = await this.prisma.productLike.findFirst({
            where: { productID, userID: Number(user.id) }
        });
        if (like) {
            await this.prisma.productLike.delete({
                where: { id: like.id }
            });
            return successResponse(200, { isLiked: false }, "Bỏ thích sản phẩm thành công");
        }
        await this.prisma.productLike.create({
            data: {
                productID,
                userID: Number(user.id),
            }
        });
        return successResponse(200, { isLiked: true }, "Thích sản phẩm thành công");
    }

}