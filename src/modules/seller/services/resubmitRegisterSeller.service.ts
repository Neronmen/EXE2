import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import type { File as MulterFile } from "multer";
import { KycDocumentType, SellerStatusEnum } from "@prisma/client";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
import { ResubmitSellerDto } from "../dtos/resubmit-seller.dto";

@Injectable()
export class ResubmitRegisterSellerService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly supabase: SupabaseService,
    ) { }

    async resubmitSeller(dto: ResubmitSellerDto, files: any, user) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { userID: user.id },
        });

        if (!seller) {
            return errorResponse(400, "Bạn chưa từng đăng ký seller.", "NOT_REGISTER_SELLER");
        }

        if (seller.status !== "REJECTED") {
            return errorResponse(400, "Chỉ được gửi lại khi hồ sơ bị từ chối.", "RESUBMIT_STATUS_INVALID");
        }

        const updatedSeller = await this.prisma.sellerProfile.update({
            where: { id: seller.id },
            data: {
                companyName: dto.companyName ?? seller.companyName,
                brandName: dto.brandName ?? seller.brandName,
                businessPhone: dto.businessPhone ?? seller.businessPhone,
                businessAddress: dto.businessAddress ?? seller.businessAddress,
                description: dto.description ?? seller.description,
                status: SellerStatusEnum.PENDING,
                rejectionReason: null,
                updatedBy: user.id,
            },
        });

        const fileMap: { file?: MulterFile; type: KycDocumentType }[] = [
            { file: files.idCardFront?.[0], type: KycDocumentType.ID_CARD_FRONT },
            { file: files.idCardBack?.[0], type: KycDocumentType.ID_CARD_BACK },
            { file: files.businessLicense?.[0], type: KycDocumentType.BUSINESS_LICENSE },
            { file: files.foodSafetyCert?.[0], type: KycDocumentType.FOOD_SAFETY_CERT },
        ];

        // Lọc ra file thực tế được gửi lại
        const validFiles = fileMap.filter((f) => f.file).map((f) => f.file!);
        let uploadedUrls: string[] = [];

        if (validFiles.length > 0) {
            uploadedUrls = await this.supabase.upload(validFiles);
        }

        //  Cập nhật lại các tài liệu KYC (chỉ thay file nào có upload lại)
        for (const entry of fileMap) {
            if (!entry.file) continue;
            const fileUrl = uploadedUrls.shift();

            // xóa KYC cũ nếu tồn tại
            await this.prisma.sellerKycDocument.deleteMany({
                where: { sellerID: seller.id, type: entry.type },
            });

            // tạo bản ghi KYC mới
            await this.prisma.sellerKycDocument.create({
                data: {
                    sellerID: seller.id,
                    type: entry.type,
                    url: fileUrl!,
                    filename: entry.file.originalname,
                    mimeType: entry.file.mimetype,
                    size: entry.file.size,
                },
            });
        }

        return successResponse(200, updatedSeller, "Gửi lại hồ sơ thành công, vui lòng chờ duyệt");
    }
}
