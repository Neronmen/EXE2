import { VerifyOtpDto } from "../dtos/verify-otp.dto";
import { VerifyOtpService } from "../services/verify-otp.service";
export declare class VerifyOtpController {
    private readonly VerifyOtpService;
    constructor(VerifyOtpService: VerifyOtpService);
    verifyOtp(dto: VerifyOtpDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
