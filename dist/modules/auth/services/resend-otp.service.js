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
exports.ResendOTPService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_repository_1 = require("../repositories/auth.repository");
const response_util_1 = require("../../../common/utils/response.util");
const bcrypt = require("bcrypt");
const mail_service_1 = require("../../common/mail/mail.service");
let ResendOTPService = class ResendOTPService {
    jwtService;
    authRepo;
    mailer;
    constructor(jwtService, authRepo, mailer) {
        this.jwtService = jwtService;
        this.authRepo = authRepo;
        this.mailer = mailer;
    }
    async resendOTP(email) {
        const user = await this.authRepo.findByEmailAndProvider(email, 'local');
        if (!user) {
            return (0, response_util_1.errorResponse)(400, 'User không tồn tại', 'USER_NOT_FOUND');
        }
        const lastOtp = await this.authRepo.lastOTPByUser(user.id);
        if (lastOtp && lastOtp.createdAt > new Date(Date.now() - 60 * 1000)) {
            return (0, response_util_1.errorResponse)(400, 'Vui lòng chờ 60 giây trước khi gửi lại OTP', 'WAIT_60s');
        }
        await this.authRepo.deleteRecordPasswordByUser(user.id);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpHash = await bcrypt.hash(otp, 10);
        await this.authRepo.createPasswordReset(user.id, otpHash);
        this.mailer.sendMail(user.email, 'Password Reset OTP', `
            <p>Xin chào <b>${user.name || ''}</b>,</p>
            <p>Bạn vừa yêu cầu đặt lại mật khẩu. Vui lòng sử dụng mã OTP sau:</p>
            <div class="otp-box">${otp}</div>
            <p>Mã OTP có hiệu lực trong 3 phút. Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
            `);
        return (0, response_util_1.successResponse)(200, 'Gửi OTP lại thành công');
    }
};
exports.ResendOTPService = ResendOTPService;
exports.ResendOTPService = ResendOTPService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        auth_repository_1.AuthRepository,
        mail_service_1.MailerService])
], ResendOTPService);
//# sourceMappingURL=resend-otp.service.js.map