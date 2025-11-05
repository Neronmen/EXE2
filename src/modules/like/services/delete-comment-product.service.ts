import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { UpdateProductCommentDto } from "../dtos/update-product-comment.dto";
import type { File as MulterFile } from 'multer';
import { SupabaseService } from "src/modules/common/subapase/supabase.service";


@Injectable()
export class DeleteProductCommentService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly supabase: SupabaseService,
    ) { }
    async deleteComment(commentID: number, user) {

        const comment = await this.prisma.productComment.findUnique({
            where: { id: commentID },
            include: {
                ProductCommentImage: true,
                product: { select: { sellerID: true } },
            },
        });
        if (!comment) {
            return errorResponse(400, 'Bình luận không tồn tại', "COMMENT_NOT_FOUND");
        }
        if (user.roleID === 6) {
            if (comment.userID !== user.id) {
                return errorResponse(400, 'Bạn không có quyền xóa comment này', "FORBIDDEN");
            }
        } else if ([4].includes(user.roleID)) {
            const seller = await this.prisma.sellerProfile.findUnique({
                where: { userID: user.id },
                select: { id: true, userID: true },
            });
            if (!seller) {
                return errorResponse(400, 'Bạn không có quyền xóa comment', "FORBIDDEN");
            }

            if (comment.product.sellerID !== seller.id) {
                return errorResponse(400, 'Bạn chỉ có thể xóa comment trên sản phẩm của mình', "FORBIDDEN");
            }
        } else {
            return errorResponse(400, 'Bạn không có quyền xóa comment', "FORBIDDEN");
        }

        await this.prisma.$transaction([
            this.prisma.productCommentImage.deleteMany({ where: { productCommentID: commentID } }),
            this.prisma.productComment.delete({ where: { id: commentID } }),
        ]);
        return successResponse(200, null, 'Xóa comment thành công');
    }
}