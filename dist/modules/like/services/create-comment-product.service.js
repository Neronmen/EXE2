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
exports.CreateProductCommentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const supabase_service_1 = require("../../common/subapase/supabase.service");
const response_util_1 = require("../../../common/utils/response.util");
let CreateProductCommentService = class CreateProductCommentService {
    prisma;
    supabase;
    constructor(prisma, supabase) {
        this.prisma = prisma;
        this.supabase = supabase;
    }
    async createComment(productId, dto, userId, files) {
        const newComment = await this.prisma.productComment.create({
            data: {
                productID: productId,
                content: dto.content,
                userID: userId,
            },
        });
        let uploadedUrls = [];
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
        return (0, response_util_1.successResponse)(200, record, "Bình luận thành công");
    }
};
exports.CreateProductCommentService = CreateProductCommentService;
exports.CreateProductCommentService = CreateProductCommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        supabase_service_1.SupabaseService])
], CreateProductCommentService);
//# sourceMappingURL=create-comment-product.service.js.map