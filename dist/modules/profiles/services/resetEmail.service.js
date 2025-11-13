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
exports.ResetPasswordService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const mail_service_1 = require("../../common/mail/mail.service");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let ResetPasswordService = class ResetPasswordService {
    prisma;
    mailer;
    constructor(prisma, mailer) {
        this.prisma = prisma;
        this.mailer = mailer;
    }
    async resetEmail(newEmail, user) {
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
        if (!record?.used) {
            return (0, response_util_1.errorResponse)(400, 'Chưa xác thực OTP', 'OTP_NOT_PASS');
        }
        const existingUser = await this.prisma.user.findFirst({
            where: {
                email: newEmail,
                isDeleted: false,
                oauthProvider: "local",
                NOT: { id: user.id }
            }
        });
        if (existingUser) {
            return (0, response_util_1.errorResponse)(400, 'Email này đã được sử dụng bởi tài khoản khác', '');
        }
        await this.prisma.user.update({
            where: { id: user.id },
            data: { email: newEmail }
        });
        return (0, response_util_1.successResponse)(200, 'Đổi email thành công');
    }
};
exports.ResetPasswordService = ResetPasswordService;
exports.ResetPasswordService = ResetPasswordService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mail_service_1.MailerService])
], ResetPasswordService);
//# sourceMappingURL=resetEmail.service.js.map