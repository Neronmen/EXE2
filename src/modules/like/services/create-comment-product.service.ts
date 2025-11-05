import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { CreateProductCommentDto } from "../dtos/create-product-comment.dto";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
import { successResponse } from "src/common/utils/response.util";

@Injectable()
export class CreateProductCommentService {
    constructor(private readonly prisma: PrismaService,
        private readonly supabase: SupabaseService
    ) { }

    async createComment(productId: number, dto: CreateProductCommentDto, userId: number, files: any) {
        const newComment = await this.prisma.productComment.create({
            data: {
                productID: productId,
                content: dto.content,
                userID: userId,
            },
        });
        let uploadedUrls: string[] = [];
        if (files?.images?.length > 0) {
            uploadedUrls = await this.supabase.upload(files.images);
        }

        if (uploadedUrls.length > 0) {
            for (let i = 0; i < uploadedUrls.length; i++) {
                const img = files.images[i];
                await this.prisma.productCommentImage.create({
                    data: {
                        productCommentID: newComment.id,
                        url: uploadedUrls[i],
                        filename: img.originalname,
                        mimeType: img.mimetype,
                        size: img.size,
                    },
                });
            }
        }
        const record = await this.prisma.productComment.findUnique({
            where: { id: newComment.id },
            select: {
                id: true,
                content: true,
                createdAt: true,
                user: { select: { id: true, name: true, avatar: true } },

                ProductCommentImage: {
                    select: { url: true }
                },
                _count: {
                    select: { ProductCommentLike: true }
                }
            }
        });

        return successResponse(200, record, "Bình luận thành công");
    }
}
