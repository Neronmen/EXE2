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
const jwt_1 = require("@nestjs/jwt");
const auth_repository_1 = require("../repositories/auth.repository");
const response_util_1 = require("../../../common/utils/response.util");
const bcrypt = require("bcrypt");
const mail_service_1 = require("../../common/mail/mail.service");
let ResetPasswordService = class ResetPasswordService {
    jwtService;
    authRepo;
    mailer;
    constructor(jwtService, authRepo, mailer) {
        this.jwtService = jwtService;
        this.authRepo = authRepo;
        this.mailer = mailer;
    }
    async resetPassword(email, newPassword) {
        const user = await this.authRepo.findByEmailAndProvider(email, 'local');
        if (!user) {
            return (0, response_util_1.errorResponse)(400, 'User không tồn tại', 'USER_NOT_FOUND');
        }
        const record = await this.authRepo.getPasswordReset(user.id);
        if (!record?.used) {
            return (0, response_util_1.errorResponse)(400, 'Chưa xác thực OTP', 'OTP_NOT_PASS');
        }
        const hashPassword = await bcrypt.hash(newPassword, 10);
        await this.authRepo.updatePasswordByUser(user.id, hashPassword);
        await this.authRepo.deleteRecordPasswordByUser(user.id);
        return (0, response_util_1.successResponse)(200, 'Đổi mật khẩu thành công');
    }
};
exports.ResetPasswordService = ResetPasswordService;
exports.ResetPasswordService = ResetPasswordService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        auth_repository_1.AuthRepository,
        mail_service_1.MailerService])
], ResetPasswordService);
//# sourceMappingURL=reset-password.service.js.map