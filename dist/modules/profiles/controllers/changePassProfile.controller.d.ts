import { ChangePassProfileDto } from '../dtos/changePassProfile.dto';
import { ChangePassProfileService } from '../services/changePassProfile.service';
export declare class ChangePassProfileController {
    private readonly changePassProfileService;
    constructor(changePassProfileService: ChangePassProfileService);
    changePass(userID: String, data: ChangePassProfileDto, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
