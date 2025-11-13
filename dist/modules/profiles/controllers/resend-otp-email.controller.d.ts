import { ResendOTPEmailService } from "../services/resend-otp-email.service";
export declare class ResendOTPEmailController {
    private readonly ResendOTPEmailService;
    constructor(ResendOTPEmailService: ResendOTPEmailService);
    resendOTPEmail(user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
