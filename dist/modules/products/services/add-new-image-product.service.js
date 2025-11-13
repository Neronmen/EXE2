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
exports.AddImageProductService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const supabase_service_1 = require("../../common/subapase/supabase.service");
let AddImageProductService = class AddImageProductService {
    prisma;
    supabaseService;
    constructor(prisma, supabaseService) {
        this.prisma = prisma;
        this.supabaseService = supabaseService;
    }
    async addImage(id, files, user) {
        const images = files?.images;
        if (!images || images.length === 0) {
            return (0, response_util_1.errorResponse)(400, 'Vui lòng gửi ít nhất một ảnh sản phẩm');
        }
        const [product, seller] = await Promise.all([
            this.prisma.product.findUnique({
                where: { id, isDeleted: false },
                include: { ProductImage: { select: { id: true } } },
            }),
            this.prisma.sellerProfile.findUnique({ where: { userID: user.id } }),
        ]);
        if (!seller) {
            return (0, response_util_1.errorResponse)(400, 'Người bán không tồn tại', 'SELLER_NOT_FOUND');
        }
        if (!product) {
            return (0, response_util_1.errorResponse)(400, 'Sản phẩm không tồn tại', 'PRODUCT_NOT_FOUND');
        }
        if (product.sellerID !== seller.id) {
            return (0, response_util_1.errorResponse)(400, 'Bạn không có quyền thêm ảnh cho sản phẩm này', 'FORBIDDEN');
        }
        if (!files || !files.images || files.images.length === 0) {
            return (0, response_util_1.errorResponse)(400, 'Không có ảnh để tải lên', 'NO_IMAGES_UPLOADED');
        }
        const currentImageCount = product.ProductImage.length;
        const newImageCount = files.images.length;
        if (currentImageCount + newImageCount > 10) {
            return (0, response_util_1.errorResponse)(400, `Sản phẩm đã có ${currentImageCount} ảnh, chỉ có thể thêm tối đa ${10 - currentImageCount} ảnh nữa`, 'IMAGE_LIMIT_EXCEEDED');
        }
        const uploadedUrls = await this.supabaseService.upload(files.images);
        const imageData = uploadedUrls.map((url) => ({
            productID: id,
            url,
            isMain: false,
        }));
        await this.prisma.$transaction(async (tx) => {
            await tx.productImage.createMany({ data: imageData });
        });
        return (0, response_util_1.successResponse)(200, 'Thêm ảnh sản phẩm thành công');
    }
};
exports.AddImageProductService = AddImageProductService;
exports.AddImageProductService = AddImageProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        supabase_service_1.SupabaseService])
], AddImageProductService);
//# sourceMappingURL=add-new-image-product.service.js.map