import { LoginFacebookDto } from "../dtos/login-facebook.dto";
import { LoginFacebookService } from "../services/login-facebook.service";
export declare class LoginFacebookController {
    private readonly LoginFacebookService;
    constructor(LoginFacebookService: LoginFacebookService);
    loginFacebook(data: LoginFacebookDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
