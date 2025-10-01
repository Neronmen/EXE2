import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { RegisterSellerDto } from "../dtos/register-seller.dto";
import { PrismaService } from "src/libs/prisma/prisma.service";
import type { File as MulterFile } from 'multer';
import { KycDocumentType } from "@prisma/client";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";

@Injectable()
export class RegisterSellerService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly supabase: SupabaseService,

    ) { }
    async registerSeller(dto: RegisterSellerDto, files: any, user) {
        const existing = await this.prisma.sellerProfile.findUnique({
            where: { userID: user.id },
        });
        if (existing) {
            return errorResponse(400, "Bạn đã đăng ký seller rồi", "REGISTED")
        }

        // tạo hồ sơ seller
        const seller = await this.prisma.sellerProfile.create({
            data: {
                userID: user.id,
                companyName: dto.companyName,
                brandName: dto.brandName,
                businessPhone: dto.businessPhone,
                businessAddress: dto.businessAddress,
                description: dto.description,
                createdBy: user.id,
            },
        });
        const fileMap: { file?: MulterFile; type: KycDocumentType }[] = [
            { file: files.idCardFront?.[0], type: KycDocumentType.ID_CARD_FRONT },
            { file: files.idCardBack?.[0], type: KycDocumentType.ID_CARD_BACK },
            { file: files.businessLicense?.[0], type: KycDocumentType.BUSINESS_LICENSE },
            { file: files.foodSafetyCert?.[0], type: KycDocumentType.FOOD_SAFETY_CERT },
        ];
        if (!fileMap[0].file || !fileMap[1].file) {
            return errorResponse(400, "Thiếu ảnh CCCD", "CCCD_NOT_FOUND");
        }
        const validFiles = fileMap.filter((f) => f.file).map((f) => f.file!);
        const uploadedUrls = await this.supabase.upload(validFiles);
        for (let i = 0; i < fileMap.length; i++) {
            const entry = fileMap[i];
            if (!entry.file) continue;
            const fileUrl = uploadedUrls.shift();
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
        return successResponse(200, seller, "Đăng ký seller thành công, vui lòng chờ duyệt")

    }
}