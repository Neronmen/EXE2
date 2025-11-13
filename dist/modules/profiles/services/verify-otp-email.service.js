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
exports.VerifyOtpEmailService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const bcrypt = require("bcrypt");
const mail_service_1 = require("../../common/mail/mail.service");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let VerifyOtpEmailService = class VerifyOtpEmailService {
    prisma;
    mailer;
    constructor(prisma, mailer) {
        this.prisma = prisma;
        this.mailer = mailer;
    }
    async verifyOtp(user, otp) {
        const userRecord = await this.prisma.user.findUnique({
            where: { id: user.id, isDeleted: false }
        });
        if (!userRecord) {
            return (0, response_util_1.errorResponse)(400, 'User không tồn tại', '');
        }
        const record = await this.prisma.emailReset.findFirst({
            where: {
                userID: user.id,
                expiresAt: { gt: new Date() }
            },
            orderBy: { createdAt: 'desc' }
        });
        if (!record) {
            return (0, response_util_1.errorResponse)(400, 'OTP hết hạn hoặc không tồn tại', 'OTP_NOT_FOUND_OR_EXPIRED');
        }
        if (record.attempt >= 5) {
            return (0, response_util_1.errorResponse)(400, 'Quá số lần thử', 'MAX_ATTEMPT');
        }
        const match = await bcrypt.compare(otp, record.otpHash);
        if (!match) {
            await this.prisma.emailReset.update({
                where: { id: record.id },
                data: { attempt: { increment: 1 } }
            });
            return (0, response_util_1.errorResponse)(400, 'OTP sai', 'OTP_WRONG');
        }
        await this.prisma.emailReset.update({
            where: { userID: user.id },
            data: { used: true }
        });
        return (0, response_util_1.successResponse)(200, 'OTP chính xác, tiến hành đổi email mới', 'OTP_TRUE');
    }
};
exports.VerifyOtpEmailService = VerifyOtpEmailService;
exports.VerifyOtpEmailService = VerifyOtpEmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mail_service_1.MailerService])
], VerifyOtpEmailService);
//# sourceMappingURL=verify-otp-email.service.js.map