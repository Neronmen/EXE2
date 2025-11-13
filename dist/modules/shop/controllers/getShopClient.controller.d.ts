import { GetShopClientService } from "../services/getShopClient.service";
export declare class GetShopClientController {
    private readonly GetShopClientService;
    constructor(GetShopClientService: GetShopClientService);
    getShopClient(slug: string, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
