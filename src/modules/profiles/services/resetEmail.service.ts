import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import * as bcrypt from 'bcrypt';
import { MailerService } from "src/modules/common/mail/mail.service";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class ResetPasswordService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mailer: MailerService,
    ) { }
    async resetEmail(newEmail: string, user) {
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
        if (!record?.used) {
            return errorResponse(400, 'Chưa xác thực OTP', 'OTP_NOT_PASS')
        }
        const existingUser = await this.prisma.user.findFirst({
            where: {
                email: newEmail,
                isDeleted: false,
                oauthProvider: "local",
                NOT: { id: user.id }
            }
        });

        if (existingUser) {
            return errorResponse(400, 'Email này đã được sử dụng bởi tài khoản khác', '');
        }

        await this.prisma.user.update({
            where: { id: user.id },
            data: { email: newEmail }
        });

        return successResponse(200, 'Đổi email thành công')
    }
}
