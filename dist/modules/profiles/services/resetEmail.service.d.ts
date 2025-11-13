import { MailerService } from "src/modules/common/mail/mail.service";
import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class ResetPasswordService {
    private readonly prisma;
    private readonly mailer;
    constructor(prisma: PrismaService, mailer: MailerService);
    resetEmail(newEmail: string, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
