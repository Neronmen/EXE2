import { VerifyOtpEmailDto } from "../dtos/verify-otp-email.dto";
import { VerifyOtpEmailService } from "../services/verify-otp-email.service";
export declare class VerifyOtpEmailController {
    private readonly VerifyOtpEmailService;
    constructor(VerifyOtpEmailService: VerifyOtpEmailService);
    verifyOtp(dto: VerifyOtpEmailDto, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
