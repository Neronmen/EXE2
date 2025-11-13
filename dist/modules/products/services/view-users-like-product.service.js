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
exports.ViewUserLikeProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const response_util_1 = require("../../../common/utils/response.util");
let ViewUserLikeProductService = class ViewUserLikeProductService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async viewUserLikeProduct(productId) {
        const product = await this.prisma.product.findFirst({
            where: { id: productId, isDeleted: false },
            select: {
                id: true,
            }
        });
        if (!product)
            return (0, response_util_1.errorResponse)(400, "Sản phẩm không tồn tại", "PRODUCT_NOT_FOUND");
        const likes = await this.prisma.productLike.findMany({
            where: { productID: productId },
            select: {
                user: { select: { id: true, name: true, avatar: true } },
            },
            orderBy: { createdAt: "desc" },
        });
        return (0, response_util_1.successResponse)(200, likes, "Lấy danh sách người dùng thích sản phẩm thành công");
    }
    ;
};
exports.ViewUserLikeProductService = ViewUserLikeProductService;
exports.ViewUserLikeProductService = ViewUserLikeProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ViewUserLikeProductService);
//# sourceMappingURL=view-users-like-product.service.js.map