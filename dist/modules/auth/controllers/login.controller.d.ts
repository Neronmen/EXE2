import { LoginDto } from "../dtos/login.dto";
import { LoginService } from "../services/login.service";
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    login(data: LoginDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
