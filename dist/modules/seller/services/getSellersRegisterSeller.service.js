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
exports.GetSellersRegisterSellerService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let GetSellersRegisterSellerService = class GetSellersRegisterSellerService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async getSellersRegisterSeller(status) {
        const records = await this.prisma.sellerProfile.findMany({
            where: status ? { status } : {},
            select: {
                id: true,
                companyName: true,
                brandName: true,
                slug: true,
                status: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true,
                        phone: true,
                    }
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return (0, response_util_1.successResponse)(200, records, 'Lấy danh sách đơn đăng ký thành công');
    }
};
exports.GetSellersRegisterSellerService = GetSellersRegisterSellerService;
exports.GetSellersRegisterSellerService = GetSellersRegisterSellerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], GetSellersRegisterSellerService);
//# sourceMappingURL=getSellersRegisterSeller.service.js.map