import { MailerService } from "src/modules/common/mail/mail.service";
import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class ResendOTPEmailService {
    private readonly mailer;
    private readonly prisma;
    constructor(mailer: MailerService, prisma: PrismaService);
    resendOTPEmail(user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
