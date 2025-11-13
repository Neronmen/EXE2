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
exports.DeleteProductCommentService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const supabase_service_1 = require("../../common/subapase/supabase.service");
let DeleteProductCommentService = class DeleteProductCommentService {
    prisma;
    supabase;
    constructor(prisma, supabase) {
        this.prisma = prisma;
        this.supabase = supabase;
    }
    async deleteComment(commentID, user) {
        const comment = await this.prisma.productComment.findUnique({
            where: { id: commentID },
            include: {
                ProductCommentImage: true,
                product: { select: { sellerID: true } },
            },
        });
        if (!comment) {
            return (0, response_util_1.errorResponse)(400, 'Bình luận không tồn tại', "COMMENT_NOT_FOUND");
        }
        if (user.roleID === 6) {
            if (comment.userID !== user.id) {
                return (0, response_util_1.errorResponse)(400, 'Bạn không có quyền xóa comment này', "FORBIDDEN");
            }
        }
        else if ([4].includes(user.roleID)) {
            const seller = await this.prisma.sellerProfile.findUnique({
                where: { userID: user.id },
                select: { id: true, userID: true },
            });
            if (!seller) {
                return (0, response_util_1.errorResponse)(400, 'Bạn không có quyền xóa comment', "FORBIDDEN");
            }
            if (comment.product.sellerID !== seller.id) {
                return (0, response_util_1.errorResponse)(400, 'Bạn chỉ có thể xóa comment trên sản phẩm của mình', "FORBIDDEN");
            }
        }
        else {
            return (0, response_util_1.errorResponse)(400, 'Bạn không có quyền xóa comment', "FORBIDDEN");
        }
        await this.prisma.$transaction([
            this.prisma.productCommentImage.deleteMany({ where: { productCommentID: commentID } }),
            this.prisma.productComment.delete({ where: { id: commentID } }),
        ]);
        return (0, response_util_1.successResponse)(200, null, 'Xóa comment thành công');
    }
};
exports.DeleteProductCommentService = DeleteProductCommentService;
exports.DeleteProductCommentService = DeleteProductCommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        supabase_service_1.SupabaseService])
], DeleteProductCommentService);
//# sourceMappingURL=delete-comment-product.service.js.map