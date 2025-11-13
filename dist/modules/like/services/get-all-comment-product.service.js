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
exports.GetAllCommentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const supabase_service_1 = require("../../common/subapase/supabase.service");
const response_util_1 = require("../../../common/utils/response.util");
let GetAllCommentService = class GetAllCommentService {
    prisma;
    supabase;
    constructor(prisma, supabase) {
        this.prisma = prisma;
        this.supabase = supabase;
    }
    async getAll(productId, query) {
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
        };
        return (0, response_util_1.successResponse)(200, resultFormat, "Lấy danh sách comment thành công");
    }
};
exports.GetAllCommentService = GetAllCommentService;
exports.GetAllCommentService = GetAllCommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        supabase_service_1.SupabaseService])
], GetAllCommentService);
//# sourceMappingURL=get-all-comment-product.service.js.map