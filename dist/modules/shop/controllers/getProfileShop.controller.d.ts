import { GetProfileShopService } from "../services/getProfileShop.service";
export declare class GetProfileShopController {
    private readonly GetProfileShopService;
    constructor(GetProfileShopService: GetProfileShopService);
    getProfileShop(user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
