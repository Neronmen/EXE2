import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRepository } from "../repositories/auth.repository";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import * as bcrypt from 'bcrypt';
import { MailerService } from "src/modules/common/mail/mail.service";


@Injectable()
export class ResetPasswordService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly authRepo: AuthRepository,
        private readonly mailer: MailerService,
    ) { }
    async resetPassword(email: string, newPassword: string) {
        const user = await this.authRepo.findByEmailAndProvider(email, 'local');
        if (!user) {
            return errorResponse(400, 'User không tồn tại', 'USER_NOT_FOUND')
        }
        const record = await this.authRepo.getPasswordReset(user.id);
        if (!record?.used) {
            return errorResponse(400, 'Chưa xác thực OTP', 'OTP_NOT_PASS')
        }
        const hashPassword = await bcrypt.hash(newPassword, 10);
        await this.authRepo.updatePasswordByUser(user.id, hashPassword)
        await this.authRepo.deleteRecordPasswordByUser(user.id)
        return successResponse(200, 'Đổi mật khẩu thành công')
    }
}
