import { MailerService } from "src/modules/common/mail/mail.service";
import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class VerifyOtpEmailService {
    private readonly prisma;
    private readonly mailer;
    constructor(prisma: PrismaService, mailer: MailerService);
    verifyOtp(user: any, otp: string): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
