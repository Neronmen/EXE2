import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { CreateProductCommentDto } from "../dtos/create-product-comment.dto";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
import { successResponse } from "src/common/utils/response.util";
import { GetAllCommentProductClientQueryDto } from "../dtos/get-alproduct-comment.dto";

@Injectable()
export class GetAllCommentService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly supabase: SupabaseService
    ) { }

    async getAll(
        productId: number,
        query: GetAllCommentProductClientQueryDto,

    ) {
        const { page = 1, limit = 20 } = query;
        const skip = (page - 1) * limit;

        const [comments, total] = await this.prisma.$transaction([
            this.prisma.productComment.findMany({
                where: { productID: productId },
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: {
                    user: { select: { id: true, name: true, avatar: true } },
                    ProductCommentImage: { select: { url: true } },
                    _count: { select: { ProductCommentLike: true } },
                },
            }),
            this.prisma.productComment.count({
                where: { productID: productId },
            }),
        ]);


        const result = comments.map(comment => ({
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt,
            user: comment.user,
            images: comment.ProductCommentImage.map(img => img.url),
            likeCount: comment._count.ProductCommentLike,
        }));

        const pagination = { page, limit, total, totalPages: Math.ceil(total / limit) };
        const resultFormat = {
            comments: result,
            pagination
        }

        return successResponse(200, resultFormat, "Lấy danh sách comment thành công");
    }

}
