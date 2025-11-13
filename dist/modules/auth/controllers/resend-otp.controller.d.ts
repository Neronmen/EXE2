import { ResendOTPDTO } from "../dtos/resend-otp.dto";
import { ResendOTPService } from "../services/resend-otp.service";
export declare class ResendOTPController {
    private readonly ResendOTPService;
    constructor(ResendOTPService: ResendOTPService);
    resendOTP(dto: ResendOTPDTO): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
