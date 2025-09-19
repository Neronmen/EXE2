import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRepository } from "../repositories/auth.repository";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import * as bcrypt from 'bcrypt';
import { MailerService } from "src/modules/common/mail/mail.service";


@Injectable()
export class VerifyOtpService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly authRepo: AuthRepository,
        private readonly mailer: MailerService,
    ) { }
    async verifyOtp(email: string, otp: string) {
        // Check email 
        const user = await this.authRepo.findByEmailAndProvider(email, 'local');
        if (!user) {
            return errorResponse(400, 'Nếu email tồn tại, OTP đã được gửi', 'EMAIL_NOT_FOUND')
        }

        const record = await this.authRepo.getPasswordReset(user.id);
        if (!record) {
            return errorResponse(400, 'OTP hết hạn hoặc không tồn tại', 'OTP_NOT_FOUND_OR_EXPIRED')

        }
        if (record.attempt >= 5) {
            return errorResponse(400, 'Quá số lần thử', 'MAX_ATTEMPT')
        }
        const match = await bcrypt.compare(otp, record.otpHash);
        if (!match) {
            await this.authRepo.updateAttempt(record.id)
            return errorResponse(400, 'OTP sai', 'OTP_WRONG')
        }
        await this.authRepo.updateUsed(user.id);
        return successResponse(200, 'OTP chính xác, tiến hành đổi mật khẩu đổi mật khẩu', 'OTP_TRUE')
    }
}
