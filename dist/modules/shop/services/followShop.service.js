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
exports.ShopFollowerService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let ShopFollowerService = class ShopFollowerService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async followShop(sellerID, userID) {
        const shop = await this.prisma.sellerProfile.findUnique({ where: { id: sellerID } });
        if (!shop) {
            return (0, response_util_1.errorResponse)(404, "Không tìm thấy cửa hàng", "SHOP_NOT_FOUND");
        }
        if (shop.userID === userID) {
            return (0, response_util_1.errorResponse)(400, "Bạn không thể theo dõi chính cửa hàng của mình", "CANNOT_FOLLOW_OWN_SHOP");
        }
        const existing = await this.prisma.shopFollower.findUnique({
            where: { userID_sellerID: { userID, sellerID } },
        });
        if (existing) {
            return (0, response_util_1.errorResponse)(400, "Bạn đã theo dõi cửa hàng này rồi", "ALREADY_FOLLOWED");
        }
        await this.prisma.$transaction([
            this.prisma.shopFollower.create({
                data: {
                    userID,
                    sellerID
                }
            }),
            this.prisma.sellerProfile.update({
                where: { id: sellerID },
                data: { totalFollowers: { increment: 1 } },
            })
        ]);
        return (0, response_util_1.successResponse)(200, "Theo dõi cửa hàng thành công");
    }
};
exports.ShopFollowerService = ShopFollowerService;
exports.ShopFollowerService = ShopFollowerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShopFollowerService);
//# sourceMappingURL=followShop.service.js.map