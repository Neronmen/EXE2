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
exports.RegisterSellerService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
const client_1 = require("@prisma/client");
const supabase_service_1 = require("../../common/subapase/supabase.service");
const transliteration_1 = require("transliteration");
let RegisterSellerService = class RegisterSellerService {
    prisma;
    supabase;
    constructor(prisma, supabase) {
        this.prisma = prisma;
        this.supabase = supabase;
    }
    async registerSeller(dto, files, user) {
        const existing = await this.prisma.sellerProfile.findUnique({
            where: { userID: user.id },
        });
        if (existing) {
            return (0, response_util_1.errorResponse)(400, "Bạn đã đăng ký seller rồi", "REGISTED");
        }
        const slugBase = dto.brandName || dto.companyName;
        const slug = (0, transliteration_1.slugify)(slugBase, { lowercase: true, separator: '-' });
        let finalSlug = slug;
        const exists = await this.prisma.sellerProfile.findUnique({ where: { slug } });
        if (exists) {
            finalSlug = `${slug}-${Date.now()}`;
        }
        const seller = await this.prisma.sellerProfile.create({
            data: {
                userID: user.id,
                companyName: dto.companyName,
                slug: finalSlug,
                brandName: dto.brandName,
                businessPhone: dto.businessPhone,
                businessAddress: dto.businessAddress,
                description: dto.description,
                createdBy: user.id,
            },
        });
        const fileMap = [
            { file: files.idCardFront?.[0], type: client_1.KycDocumentType.ID_CARD_FRONT },
            { file: files.idCardBack?.[0], type: client_1.KycDocumentType.ID_CARD_BACK },
            { file: files.businessLicense?.[0], type: client_1.KycDocumentType.BUSINESS_LICENSE },
            { file: files.foodSafetyCert?.[0], type: client_1.KycDocumentType.FOOD_SAFETY_CERT },
        ];
        if (!fileMap[0].file || !fileMap[1].file) {
            return (0, response_util_1.errorResponse)(400, "Thiếu ảnh CCCD", "CCCD_NOT_FOUND");
        }
        const validFiles = fileMap.filter((f) => f.file).map((f) => f.file);
        const uploadedUrls = await this.supabase.upload(validFiles);
        for (let i = 0; i < fileMap.length; i++) {
            const entry = fileMap[i];
            if (!entry.file)
                continue;
            const fileUrl = uploadedUrls.shift();
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
        return (0, response_util_1.successResponse)(200, seller, "Đăng ký seller thành công, vui lòng chờ duyệt");
    }
};
exports.RegisterSellerService = RegisterSellerService;
exports.RegisterSellerService = RegisterSellerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        supabase_service_1.SupabaseService])
], RegisterSellerService);
//# sourceMappingURL=registerSeller.service.js.map