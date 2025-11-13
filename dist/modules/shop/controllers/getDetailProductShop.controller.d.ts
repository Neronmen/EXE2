import { GetDetailProductShopClientService } from "../services/getDetailProductShop.service";
export declare class GetDetailProductShopClientController {
    private readonly GetDetailProductShopClientService;
    constructor(GetDetailProductShopClientService: GetDetailProductShopClientService);
    getDetailCategoryShopClient(id: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
