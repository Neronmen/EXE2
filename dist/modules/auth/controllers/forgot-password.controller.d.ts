import { ForgotPasswordDto } from "../dtos/forgot-password.dto";
import { ForgotPasswordService } from "../services/forgot-password.service";
export declare class ForgotPasswordController {
    private readonly forgotPasswordService;
    constructor(forgotPasswordService: ForgotPasswordService);
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
