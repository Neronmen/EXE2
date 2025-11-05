import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { UpdateProductCommentDto } from "../dtos/update-product-comment.dto";
import type { File as MulterFile } from 'multer';
import { SupabaseService } from "src/modules/common/subapase/supabase.service";


@Injectable()
export class UpdateProductCommentService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly supabase: SupabaseService,
    ) { }
    async updateComment(commentID: number, dto: UpdateProductCommentDto, userID: number, files: any) {

        const comment = await this.prisma.productComment.findUnique({
            where: { id: commentID },
            include: { ProductCommentImage: true },
        });
        if (!comment) {
            return errorResponse(400, 'Bình luận không tồn tại', "COMMENT_NOT_FOUND");
        }
        if (comment.userID !== userID) {
            return errorResponse(400, 'Bạn không có quyền sửa bình luận này', "FORBIDDEN");
        }

        let uploadedUrls: string[] = [];
        if (files?.images?.length > 0) {
            uploadedUrls = await this.supabase.upload(files.images);
        }

        await this.prisma.$transaction(async (tx) => {
            if (dto.content) {
                await tx.productComment.update({
                    where: { id: commentID },
                    data: { content: dto.content },
                });
            }

            if (dto.deleteImageIds?.length) {
                await tx.productCommentImage.deleteMany({
                    where: { id: { in: dto.deleteImageIds }, productCommentID: commentID },
                });
            }

            if (uploadedUrls.length > 0) {
                for (let i = 0; i < uploadedUrls.length; i++) {
                    const img = files.images[i];
                    await this.prisma.productCommentImage.create({
                        data: {
                            productCommentID: commentID,
                            url: uploadedUrls[i],
                            filename: img.originalname,
                            mimeType: img.mimetype,
                            size: img.size,
                        },
                    });
                }
            }


        });

        const updatedComment = await this.prisma.productComment.findUnique({
            where: { id: commentID },
            select: {
                id: true,
                content: true,
                createdAt: true,
                ProductCommentImage: { select: { id: true, url: true } },
                _count: { select: { ProductCommentLike: true } },
            },
        });

        return successResponse(200, updatedComment, "Cập nhật comment thành công");


    }

}