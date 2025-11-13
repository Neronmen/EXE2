import { ResetPasswordDto } from "../dtos/reset-password.dto";
import { ResetPasswordService } from "../services/reset-password.service";
export declare class ResetPasswordController {
    private readonly ResetPasswordService;
    constructor(ResetPasswordService: ResetPasswordService);
    resetPassword(dto: ResetPasswordDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
