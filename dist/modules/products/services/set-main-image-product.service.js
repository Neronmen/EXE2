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
exports.SetMainImageProductService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const supabase_service_1 = require("../../common/subapase/supabase.service");
let SetMainImageProductService = class SetMainImageProductService {
    prisma;
    supabaseService;
    constructor(prisma, supabaseService) {
        this.prisma = prisma;
        this.supabaseService = supabaseService;
    }
    async setMainImage(productId, imageId, user) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId, isDeleted: false },
            include: { ProductImage: true },
        });
        if (!product)
            return (0, response_util_1.errorResponse)(400, "Sản phẩm không tồn tại", "PRODUCT_NOT_FOUND");
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { userID: user.id },
        });
        if (!seller)
            return (0, response_util_1.errorResponse)(400, "Người bán không tồn tại", "SELLER_NOT_FOUND");
        if (product.sellerID !== seller.id)
            return (0, response_util_1.errorResponse)(400, "Bạn không có quyền cập nhật ảnh sản phẩm này", "FORBIDDEN");
        const image = product.ProductImage.find((img) => img.id === imageId);
        if (!image)
            return (0, response_util_1.errorResponse)(400, "Ảnh không tồn tại", "IMAGE_NOT_FOUND");
        await this.prisma.$transaction([
            this.prisma.productImage.updateMany({
                where: { productID: product.id },
                data: { isMain: false },
            }),
            this.prisma.productImage.update({
                where: { id: image.id },
                data: { isMain: true },
            }),
        ]);
        return (0, response_util_1.successResponse)(200, "Cập nhật ảnh chính thành công");
    }
};
exports.SetMainImageProductService = SetMainImageProductService;
exports.SetMainImageProductService = SetMainImageProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        supabase_service_1.SupabaseService])
], SetMainImageProductService);
//# sourceMappingURL=set-main-image-product.service.js.map