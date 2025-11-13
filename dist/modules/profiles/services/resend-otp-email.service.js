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
exports.ResendOTPEmailService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const bcrypt = require("bcrypt");
const mail_service_1 = require("../../common/mail/mail.service");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let ResendOTPEmailService = class ResendOTPEmailService {
    mailer;
    prisma;
    constructor(mailer, prisma) {
        this.mailer = mailer;
        this.prisma = prisma;
    }
    async resendOTPEmail(user) {
        const userRecord = await this.prisma.user.findUnique({
            where: { id: user.id, isDeleted: false }
        });
        if (!userRecord) {
            return (0, response_util_1.errorResponse)(400, 'User không tồn tại', '');
        }
        const lastOtp = await this.prisma.emailReset.findFirst({
            where: { userID: user.id },
            orderBy: { createdAt: 'desc' },
        });
        if (lastOtp && lastOtp.createdAt > new Date(Date.now() - 60 * 1000)) {
            return (0, response_util_1.errorResponse)(400, 'Vui lòng chờ 60 giây trước khi gửi lại OTP', 'WAIT_60s');
        }
        await this.prisma.emailReset.deleteMany({
            where: { userID: user.id },
        });
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpHash = await bcrypt.hash(otp, 10);
        await this.prisma.emailReset.create({
            data: {
                userID: user.id,
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
        return (0, response_util_1.successResponse)(200, 'Gửi OTP lại thành công');
    }
};
exports.ResendOTPEmailService = ResendOTPEmailService;
exports.ResendOTPEmailService = ResendOTPEmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mail_service_1.MailerService,
        prisma_service_1.PrismaService])
], ResendOTPEmailService);
//# sourceMappingURL=resend-otp-email.service.js.map