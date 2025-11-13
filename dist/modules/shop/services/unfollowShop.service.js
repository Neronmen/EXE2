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
exports.UnFollowerService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let UnFollowerService = class UnFollowerService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async unfollowShop(sellerID, userID) {
        const existing = await this.prisma.shopFollower.findUnique({
            where: { userID_sellerID: { userID, sellerID } },
        });
        if (!existing) {
            return (0, response_util_1.errorResponse)(400, "Bạn chưa theo dõi cửa hàng này", "NOT_FOLLOWED");
        }
        await this.prisma.shopFollower.delete({
            where: { userID_sellerID: { userID, sellerID } },
        });
        await this.prisma.sellerProfile.update({
            where: { id: sellerID },
            data: { totalFollowers: { decrement: 1 } },
        });
        return (0, response_util_1.successResponse)(200, "Bỏ theo dõi cửa hàng thành công");
    }
};
exports.UnFollowerService = UnFollowerService;
exports.UnFollowerService = UnFollowerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UnFollowerService);
//# sourceMappingURL=unfollowShop.service.js.map