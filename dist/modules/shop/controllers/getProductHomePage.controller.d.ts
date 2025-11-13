import { GetAllProductHomePageClientService } from "../services/getProductHomePage.service";
export declare class GetAllProductHomePageShopClientController {
    private readonly getAllProductHomePageClientService;
    constructor(getAllProductHomePageClientService: GetAllProductHomePageClientService);
    getAllProductHomePageShopClient(): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
