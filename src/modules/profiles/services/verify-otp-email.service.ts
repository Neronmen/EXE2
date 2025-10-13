import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import * as bcrypt from 'bcrypt';
import { MailerService } from "src/modules/common/mail/mail.service";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class VerifyOtpEmailService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mailer: MailerService,
    ) { }
    async verifyOtp(user, otp: string) {
        const userRecord = await this.prisma.user.findUnique({
            where: { id: user.id, isDeleted: false }
        })
        if (!userRecord) {
            return errorResponse(400, 'User không tồn tại', '')
        }

        const record = await this.prisma.emailReset.findFirst({
            where: {
                userID: user.id,
                expiresAt: { gt: new Date() }
            },
            orderBy: { createdAt: 'desc' }
        });

        if (!record) {
            return errorResponse(400, 'OTP hết hạn hoặc không tồn tại', 'OTP_NOT_FOUND_OR_EXPIRED')
        }
        if (record.attempt >= 5) {
            return errorResponse(400, 'Quá số lần thử', 'MAX_ATTEMPT')
        }
        const match = await bcrypt.compare(otp, record.otpHash);
        if (!match) {
            await this.prisma.emailReset.update({
                where: { id: record.id },
                data: { attempt: { increment: 1 } }
            });
            return errorResponse(400, 'OTP sai', 'OTP_WRONG')
        }
        await this.prisma.emailReset.update({
            where: { userID: user.id },
            data: { used: true }
        }); return successResponse(200, 'OTP chính xác, tiến hành đổi email mới', 'OTP_TRUE')
    }
}
