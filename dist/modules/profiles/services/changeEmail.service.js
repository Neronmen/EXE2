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
exports.ChangeEmailService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const crypto_1 = require("crypto");
const bcrypt = require("bcrypt");
const mail_service_1 = require("../../common/mail/mail.service");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let ChangeEmailService = class ChangeEmailService {
    prisma;
    mailer;
    constructor(prisma, mailer) {
        this.prisma = prisma;
        this.mailer = mailer;
    }
    async changeEmail(user) {
        const userRecord = await this.prisma.user.findUnique({
            where: { id: user.id, isDeleted: false }
        });
        if (!userRecord) {
            return (0, response_util_1.errorResponse)(400, 'User không tồn tại', '');
        }
        if (userRecord.status === "BLOCKED") {
            return (0, response_util_1.errorResponse)(400, 'Tài khoản đã bị cấm', '');
        }
        const otp = String((0, crypto_1.randomInt)(0, 1_000_000)).padStart(6, '0');
        const otpHash = await bcrypt.hash(otp, 10);
        const recordOtp = await this.prisma.emailReset.findMany({
            where: {
                userID: userRecord.id
            },
            orderBy: { createdAt: 'desc' }
        });
        if (recordOtp) {
            await this.prisma.emailReset.deleteMany({
                where: { userID: userRecord.id },
            });
        }
        await this.prisma.emailReset.create({
            data: {
                userID: userRecord.id,
                otpHash,
                expiresAt: new Date(Date.now() + 3 * 60 * 1000)
            }
        });
        this.mailer.sendMail(user.email, 'Xác thực thay đổi email', `
    <p>Xin chào <b>${user.name || ''}</b>,</p>
    <p>Bạn vừa yêu cầu thay đổi địa chỉ email. Vui lòng sử dụng mã OTP sau để xác nhận:</p>
    <div class="otp-box" style="font-size: 24px; font-weight: bold; margin: 10px 0;">${otp}</div>
    <p>Mã OTP có hiệu lực trong 3 phút. Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
  `);
        return (0, response_util_1.successResponse)(200, 'Gửi OTP  thành công');
    }
};
exports.ChangeEmailService = ChangeEmailService;
exports.ChangeEmailService = ChangeEmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mail_service_1.MailerService])
], ChangeEmailService);
//# sourceMappingURL=changeEmail.service.js.map