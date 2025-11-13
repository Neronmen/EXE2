import { JwtService } from "@nestjs/jwt";
import { AuthRepository } from "../repositories/auth.repository";
import { MailerService } from "src/modules/common/mail/mail.service";
export declare class VerifyOtpService {
    private readonly jwtService;
    private readonly authRepo;
    private readonly mailer;
    constructor(jwtService: JwtService, authRepo: AuthRepository, mailer: MailerService);
    verifyOtp(email: string, otp: string): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
