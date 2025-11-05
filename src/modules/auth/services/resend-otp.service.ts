import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRepository } from "../repositories/auth.repository";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import * as bcrypt from 'bcrypt';
import { MailerService } from "src/modules/common/mail/mail.service";


@Injectable()
export class ResendOTPService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly authRepo: AuthRepository,
        private readonly mailer: MailerService,
    ) { }
    async resendOTP(email: string) {
        const user = await this.authRepo.findByEmailAndProvider(email, 'local');
        if (!user) {
            return errorResponse(400, 'User không tồn tại', 'USER_NOT_FOUND')
        }

        const lastOtp = await this.authRepo.lastOTPByUser(user.id)
        if (lastOtp && lastOtp.createdAt > new Date(Date.now() - 60 * 1000)) {
            return errorResponse(400, 'Vui lòng chờ 60 giây trước khi gửi lại OTP', 'WAIT_60s')
        }

        // Xóa OTP cũ
        await this.authRepo.deleteRecordPasswordByUser(user.id)

        // Rồi tạo OTP mới
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpHash = await bcrypt.hash(otp, 10);
        await this.authRepo.createPasswordReset(user.id, otpHash)
        // gửi mail

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
        return successResponse(200, 'Gửi OTP lại thành công')


    }
}
