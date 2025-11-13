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
exports.GetProfileRegisterSellerService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let GetProfileRegisterSellerService = class GetProfileRegisterSellerService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async getProfileRegister(user) {
        const userID = user.id;
        const sellerProfile = await this.prisma.sellerProfile.findUnique({
            where: {
                userID
            },
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
                rejectionReason: true,
                SellerKycDocument: {
                    select: {
                        id: true,
                        type: true,
                        url: true,
                    },
                }
            }
        });
        if (!sellerProfile) {
            return (0, response_util_1.errorResponse)(400, 'Không tìm thấy hồ sơ đăng ký');
        }
        return (0, response_util_1.successResponse)(200, sellerProfile, 'Lấy thông tin hồ sơ đăng ký thành công');
    }
};
exports.GetProfileRegisterSellerService = GetProfileRegisterSellerService;
exports.GetProfileRegisterSellerService = GetProfileRegisterSellerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], GetProfileRegisterSellerService);
//# sourceMappingURL=getProfileRegisterSeller.service.js.map