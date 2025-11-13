"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductCommentService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const supabase_service_1 = require("../../common/subapase/supabase.service");
let UpdateProductCommentService = class UpdateProductCommentService {
    prisma;
    supabase;
    constructor(prisma, supabase) {
        this.prisma = prisma;
        this.supabase = supabase;
    }
    async updateComment(commentID, dto, userID, files) {
        const comment = await this.prisma.productComment.findUnique({
            where: { id: commentID },
            include: { ProductCommentImage: true },
        });
        if (!comment) {
            return (0, response_util_1.errorResponse)(400, 'Bình luận không tồn tại', "COMMENT_NOT_FOUND");
        }
        if (comment.userID !== userID) {
            return (0, response_util_1.errorResponse)(400, 'Bạn không có quyền sửa bình luận này', "FORBIDDEN");
        }
        let uploadedUrls = [];
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
        return (0, response_util_1.successResponse)(200, updatedComment, "Cập nhật comment thành công");
    }
};
exports.UpdateProductCommentService = UpdateProductCommentService;
exports.UpdateProductCommentService = UpdateProductCommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        supabase_service_1.SupabaseService])
], UpdateProductCommentService);
//# sourceMappingURL=update-comment-product.service.js.map