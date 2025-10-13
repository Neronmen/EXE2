import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import * as bcrypt from 'bcrypt';
import { MailerService } from "src/modules/common/mail/mail.service";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class ResendOTPEmailService {
    constructor(
        private readonly mailer: MailerService,
        private readonly prisma: PrismaService,
    ) { }
    async resendOTPEmail(user) {
        const userRecord = await this.prisma.user.findUnique({
            where: { id: user.id, isDeleted: false }
        })
        if (!userRecord) {
            return errorResponse(400, 'User không tồn tại', '')
        }

        const lastOtp = await this.prisma.emailReset.findFirst({
            where: { userID: user.id },
            orderBy: { createdAt: 'desc' },
        });
        if (lastOtp && lastOtp.createdAt > new Date(Date.now() - 60 * 1000)) {
            return errorResponse(400, 'Vui lòng chờ 60 giây trước khi gửi lại OTP', 'WAIT_60s')
        }

        // Xóa OTP cũ
        await this.prisma.emailReset.deleteMany({
            where: { userID: user.id },
        });

        // Rồi tạo OTP mới
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpHash = await bcrypt.hash(otp, 10);
        await this.prisma.emailReset.create({
            data: {
                userID: user.id,
                otpHash,
                expiresAt: new Date(Date.now() + 3 * 60 * 1000)
            }
        })
        // gửi mail
        this.mailer.sendMail(
            user.email,
            'Xác thực thay đổi email',
            `
    <p>Xin chào <b>${user.name || ''}</b>,</p>
    <p>Bạn vừa yêu cầu thay đổi địa chỉ email. Vui lòng sử dụng mã OTP sau để xác nhận:</p>
    <div class="otp-box" style="font-size: 24px; font-weight: bold; margin: 10px 0;">${otp}</div>
    <p>Mã OTP có hiệu lực trong 3 phút. Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
  `
        );
        return successResponse(200, 'Gửi OTP lại thành công')


    }
}
