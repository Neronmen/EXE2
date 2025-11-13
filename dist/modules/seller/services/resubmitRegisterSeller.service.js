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
exports.ResubmitRegisterSellerService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const client_1 = require("@prisma/client");
const supabase_service_1 = require("../../common/subapase/supabase.service");
let ResubmitRegisterSellerService = class ResubmitRegisterSellerService {
    prisma;
    supabase;
    constructor(prisma, supabase) {
        this.prisma = prisma;
        this.supabase = supabase;
    }
    async resubmitSeller(dto, files, user) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { userID: user.id },
        });
        if (!seller) {
            return (0, response_util_1.errorResponse)(400, "Bạn chưa từng đăng ký seller.", "NOT_REGISTER_SELLER");
        }
        if (seller.status !== "REJECTED") {
            return (0, response_util_1.errorResponse)(400, "Chỉ được gửi lại khi hồ sơ bị từ chối.", "RESUBMIT_STATUS_INVALID");
        }
        const updatedSeller = await this.prisma.sellerProfile.update({
            where: { id: seller.id },
            data: {
                companyName: dto.companyName ?? seller.companyName,
                brandName: dto.brandName ?? seller.brandName,
                businessPhone: dto.businessPhone ?? seller.businessPhone,
                businessAddress: dto.businessAddress ?? seller.businessAddress,
                description: dto.description ?? seller.description,
                status: client_1.SellerStatusEnum.PENDING,
                rejectionReason: null,
                updatedBy: user.id,
            },
        });
        const fileMap = [
            { file: files.idCardFront?.[0], type: client_1.KycDocumentType.ID_CARD_FRONT },
            { file: files.idCardBack?.[0], type: client_1.KycDocumentType.ID_CARD_BACK },
            { file: files.businessLicense?.[0], type: client_1.KycDocumentType.BUSINESS_LICENSE },
            { file: files.foodSafetyCert?.[0], type: client_1.KycDocumentType.FOOD_SAFETY_CERT },
        ];
        const validFiles = fileMap.filter((f) => f.file).map((f) => f.file);
        let uploadedUrls = [];
        if (validFiles.length > 0) {
            uploadedUrls = await this.supabase.upload(validFiles);
        }
        for (const entry of fileMap) {
            if (!entry.file)
                continue;
            const fileUrl = uploadedUrls.shift();
            await this.prisma.sellerKycDocument.deleteMany({
                where: { sellerID: seller.id, type: entry.type },
            });
            await this.prisma.sellerKycDocument.create({
                data: {
                    sellerID: seller.id,
                    type: entry.type,
                    url: fileUrl,
                    filename: entry.file.originalname,
                    mimeType: entry.file.mimetype,
                    size: entry.file.size,
                },
            });
        }
        return (0, response_util_1.successResponse)(200, updatedSeller, "Gửi lại hồ sơ thành công, vui lòng chờ duyệt");
    }
};
exports.ResubmitRegisterSellerService = ResubmitRegisterSellerService;
exports.ResubmitRegisterSellerService = ResubmitRegisterSellerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        supabase_service_1.SupabaseService])
], ResubmitRegisterSellerService);
//# sourceMappingURL=resubmitRegisterSeller.service.js.map