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
exports.GetListCategoryShopService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let GetListCategoryShopService = class GetListCategoryShopService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getListCategoryShop(user) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { userID: user.id },
        });
        if (!seller)
            return (0, response_util_1.errorResponse)(400, "Bạn chưa có shop", "NO_SHOP");
        const categories = await this.prisma.categoryShop.findMany({
            where: { sellerID: seller.id },
            include: {
                CategoryGlobal: { select: { id: true, name: true } },
                _count: {
                    select: { Product: true },
                },
            },
        });
        const result = categories.map((c) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            description: c.description,
            image: c.image,
            categoryGlobal: c.CategoryGlobal,
            totalProducts: c._count.Product,
        }));
        return (0, response_util_1.successResponse)(200, result, "Lấy danh mục shop thành công");
    }
};
exports.GetListCategoryShopService = GetListCategoryShopService;
exports.GetListCategoryShopService = GetListCategoryShopService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GetListCategoryShopService);
//# sourceMappingURL=getList-category-shop.service.js.map