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
exports.UpdateProfileShopService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const supabase_service_1 = require("../../common/subapase/supabase.service");
let UpdateProfileShopService = class UpdateProfileShopService {
    prisma;
    supabase;
    constructor(prisma, supabase) {
        this.prisma = prisma;
        this.supabase = supabase;
    }
    async updateProfileShop(dto, files, user) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { userID: user.id },
        });
        if (!seller) {
            return (0, response_util_1.errorResponse)(404, "Không tìm thấy hồ sơ cửa hàng", "SHOP_PROFILE_NOT_FOUND");
        }
        if (seller.status !== "APPROVED") {
            return (0, response_util_1.errorResponse)(400, "Chỉ có cửa hàng đã duyệt mới được cập nhật thông tin", "UPDATE_NOT_ALLOWED");
        }
        let avatarUrl = seller.shopAvatar ?? null;
        let bannerUrl = seller.shopBanner ?? null;
        if (files?.shopAvatar?.[0]) {
            const file = files.shopAvatar[0];
            if (!avatarUrl || !avatarUrl.includes(file.originalname)) {
                const [uploadedUrl] = await this.supabase.upload([file]);
                avatarUrl = uploadedUrl;
            }
        }
        if (files?.shopBanner?.[0]) {
            const file = files.shopBanner[0];
            if (!bannerUrl || !bannerUrl.includes(file.originalname)) {
                const [uploadedUrl] = await this.supabase.upload([file]);
                bannerUrl = uploadedUrl;
            }
        }
        const updatedSeller = await this.prisma.sellerProfile.update({
            where: { id: seller.id },
            data: {
                companyName: dto.companyName ?? seller.companyName,
                brandName: dto.brandName ?? seller.brandName,
                businessPhone: dto.businessPhone ?? seller.businessPhone,
                businessAddress: dto.businessAddress ?? seller.businessAddress,
                description: dto.description ?? seller.description,
                shopAvatar: avatarUrl,
                shopBanner: bannerUrl,
                updatedBy: user.id,
            },
        });
        return (0, response_util_1.successResponse)(200, updatedSeller, "Cập nhật hồ sơ thành công");
    }
};
exports.UpdateProfileShopService = UpdateProfileShopService;
exports.UpdateProfileShopService = UpdateProfileShopService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        supabase_service_1.SupabaseService])
], UpdateProfileShopService);
//# sourceMappingURL=updateProfileShop.service.js.map