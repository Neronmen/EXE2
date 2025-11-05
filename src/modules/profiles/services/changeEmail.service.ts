import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { randomInt } from "crypto";
import * as bcrypt from 'bcrypt';
import { MailerService } from "src/modules/common/mail/mail.service";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class ChangeEmailService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mailer: MailerService,
    ) { }
    async changeEmail(user) {
        const userRecord = await this.prisma.user.findUnique({
            where: { id: user.id, isDeleted: false }
        })
        if (!userRecord) {
            return errorResponse(400, 'User không tồn tại', '')
        }
        if (userRecord.status === "BLOCKED") {
            return errorResponse(400, 'Tài khoản đã bị cấm', '')
        }

        // Tạo otp rồi mã hóa 
        const otp = String(randomInt(0, 1_000_000)).padStart(6, '0');
        const otpHash = await bcrypt.hash(otp, 10);

        // Có otp cũ thì cook
        const recordOtp = await this.prisma.emailReset.findMany({
            where: {
                userID: userRecord.id
            },
            orderBy: { createdAt: 'desc' }
        });
        if (recordOtp) {
            await this.prisma.emailReset.deleteMany({
                where: { userID: userRecord.id },
            });
        }

        // Tạo bảng ghi 

        await this.prisma.emailReset.create({
            data: {
                userID: userRecord.id,
                otpHash,
                expiresAt: new Date(Date.now() + 3 * 60 * 1000)
            }
        })

        // Gửi mail
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
        return successResponse(200, 'Gửi OTP  thành công')


    }
}