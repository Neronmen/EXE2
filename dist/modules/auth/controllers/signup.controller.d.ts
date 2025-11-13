import { SignUpDto } from "../dtos/signUp.dto";
import { SignUpService } from "../services/signup.service";
export declare class SignUpController {
    private readonly SignUpService;
    constructor(SignUpService: SignUpService);
    signUp(data: SignUpDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
