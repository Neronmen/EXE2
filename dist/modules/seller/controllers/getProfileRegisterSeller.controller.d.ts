import { GetProfileRegisterSellerService } from "../services/getProfileRegisterSeller.service";
export declare class GetProfileRegisterSellerController {
    private readonly GetProfileRegisterSellerService;
    constructor(GetProfileRegisterSellerService: GetProfileRegisterSellerService);
    getProfileRegister(user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
