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
exports.GetProfileService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let GetProfileService = class GetProfileService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async getProfile(userID) {
        const user = await this.prisma.user.findUnique({
            where: { id: userID },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                phone: true,
                status: true,
                oauthProvider: true,
                Role: { select: { id: true, name: true } },
                SellerProfile: true,
                Address: true,
            },
        });
        if (!user) {
            return (0, response_util_1.errorResponse)(400, 'Không tìm thấy user', 'USER_NOT_FOUND');
        }
        return (0, response_util_1.successResponse)(200, user, "Lấy profile thành công");
    }
};
exports.GetProfileService = GetProfileService;
exports.GetProfileService = GetProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], GetProfileService);
//# sourceMappingURL=getProfile.service.js.map