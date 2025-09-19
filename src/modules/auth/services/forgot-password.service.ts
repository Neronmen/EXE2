import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRepository } from "../repositories/auth.repository";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { randomInt } from "crypto";
import * as bcrypt from 'bcrypt';
import { MailerService } from "src/modules/common/mail/mail.service";


@Injectable()
export class ForgotPasswordService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly authRepo: AuthRepository,
        private readonly mailer: MailerService,
    ) { }
    async forgotPassword(email: string) {
        // Check email 
        const user = await this.authRepo.findByEmailAndProvider(email, 'local');
        if (!user) {
            return errorResponse(400, 'Nếu email tồn tại, OTP đã được gửi', 'EMAIL_NOT_FOUND')
        }
        // Tạo otp rồi mã hóa 
        const otp = String(randomInt(0, 1_000_000)).padStart(6, '0');
        const otpHash = await bcrypt.hash(otp, 10);

        // Tạo bảng ghi 
        await this.authRepo.createPasswordReset(user.id, otpHash)

        // Gửi mail
        this.mailer.sendMail(
            user.email,
            'Password Reset OTP',
            `
    <p>Xin chào <b>${user.name || ''}</b>,</p>
    <p>Bạn vừa yêu cầu đặt lại mật khẩu. Vui lòng sử dụng mã OTP sau:</p>
    <div class="otp-box">${otp}</div>
    <p>Mã OTP có hiệu lực trong 3 phút. Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
  `
        );
        return successResponse(200, 'Gửi OTP  thành công')

    }
}