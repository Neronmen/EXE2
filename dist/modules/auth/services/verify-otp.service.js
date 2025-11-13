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
exports.VerifyOtpService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_repository_1 = require("../repositories/auth.repository");
const response_util_1 = require("../../../common/utils/response.util");
const bcrypt = require("bcrypt");
const mail_service_1 = require("../../common/mail/mail.service");
let VerifyOtpService = class VerifyOtpService {
    jwtService;
    authRepo;
    mailer;
    constructor(jwtService, authRepo, mailer) {
        this.jwtService = jwtService;
        this.authRepo = authRepo;
        this.mailer = mailer;
    }
    async verifyOtp(email, otp) {
        const user = await this.authRepo.findByEmailAndProvider(email, 'local');
        if (!user) {
            return (0, response_util_1.errorResponse)(400, 'Nếu email tồn tại, OTP đã được gửi', 'EMAIL_NOT_FOUND');
        }
        const record = await this.authRepo.getPasswordReset(user.id);
        if (!record) {
            return (0, response_util_1.errorResponse)(400, 'OTP hết hạn hoặc không tồn tại', 'OTP_NOT_FOUND_OR_EXPIRED');
        }
        if (record.attempt >= 5) {
            return (0, response_util_1.errorResponse)(400, 'Quá số lần thử', 'MAX_ATTEMPT');
        }
        const match = await bcrypt.compare(otp, record.otpHash);
        if (!match) {
            await this.authRepo.updateAttempt(record.id);
            return (0, response_util_1.errorResponse)(400, 'OTP sai', 'OTP_WRONG');
        }
        await this.authRepo.updateUsed(user.id);
        return (0, response_util_1.successResponse)(200, 'OTP chính xác, tiến hành đổi mật khẩu đổi mật khẩu', 'OTP_TRUE');
    }
};
exports.VerifyOtpService = VerifyOtpService;
exports.VerifyOtpService = VerifyOtpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        auth_repository_1.AuthRepository,
        mail_service_1.MailerService])
], VerifyOtpService);
//# sourceMappingURL=verify-otp.service.js.map