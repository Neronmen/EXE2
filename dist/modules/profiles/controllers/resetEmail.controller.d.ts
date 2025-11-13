import { ResetEmailDto } from "../dtos/reset-email.dto";
import { ResetPasswordService } from "../services/resetEmail.service";
export declare class ResetEmailController {
    private readonly ResetPasswordService;
    constructor(ResetPasswordService: ResetPasswordService);
    resetEmail(dto: ResetEmailDto, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
