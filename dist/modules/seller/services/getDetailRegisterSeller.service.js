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
exports.GetDetailSellersRegisterSellerService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let GetDetailSellersRegisterSellerService = class GetDetailSellersRegisterSellerService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDetailSellersRegisterSeller(sellerID) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { id: sellerID },
            select: {
                id: true,
                userID: true,
                companyName: true,
                slug: true,
                brandName: true,
                businessPhone: true,
                businessAddress: true,
                description: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        phone: true,
                        avatar: true,
                    }
                },
                SellerKycDocument: {
                    select: {
                        id: true,
                        type: true,
                        url: true,
                    }
                }
            }
        });
        if (!seller) {
            return (0, response_util_1.errorResponse)(400, `Không tìm thấy đơn đăng ký nào có ID ${sellerID}`);
        }
        return (0, response_util_1.successResponse)(200, seller, 'Lấy thông tin chi tiết thành công');
    }
};
exports.GetDetailSellersRegisterSellerService = GetDetailSellersRegisterSellerService;
exports.GetDetailSellersRegisterSellerService = GetDetailSellersRegisterSellerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GetDetailSellersRegisterSellerService);
//# sourceMappingURL=getDetailRegisterSeller.service.js.map