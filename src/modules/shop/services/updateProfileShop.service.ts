import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import type { File as MulterFile } from "multer";
import { KycDocumentType, SellerStatusEnum } from "@prisma/client";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
import { ResubmitSellerDto } from "src/modules/seller/dtos/resubmit-seller.dto";

@Injectable()
export class UpdateProfileShopService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly supabase: SupabaseService,
    ) { }

    async updateProfileShop(dto: ResubmitSellerDto, files: any, user) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { userID: user.id },
        });

        if (!seller) {
            return errorResponse(404, "Không tìm thấy hồ sơ cửa hàng", "SHOP_PROFILE_NOT_FOUND");
        }

        if (seller.status !== "APPROVED") {
            return errorResponse(400, "Chỉ có cửa hàng đã duyệt mới được cập nhật thông tin", "UPDATE_NOT_ALLOWED");
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

        return successResponse(200, updatedSeller, "Cập nhật hồ sơ thành công");
    }
}
