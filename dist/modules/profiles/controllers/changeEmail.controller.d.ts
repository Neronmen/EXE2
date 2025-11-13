import { ChangeEmailService } from "../services/changeEmail.service";
export declare class ChangeEmailProfileController {
    private readonly ChangeEmailService;
    constructor(ChangeEmailService: ChangeEmailService);
    changeEmail(user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
