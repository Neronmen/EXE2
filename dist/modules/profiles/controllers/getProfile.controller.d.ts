import { GetProfileService } from "../services/getProfile.service";
export declare class GetProfileController {
    private readonly getProfileService;
    constructor(getProfileService: GetProfileService);
    getProfile(user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
