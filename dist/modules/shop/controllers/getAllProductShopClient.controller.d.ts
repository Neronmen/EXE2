import { GetAllProductClientQueryDto } from "../dtos/get-all-product.client.query";
import { GetAllProductShopClientService } from "../services/getAllProductShopClient.service";
export declare class GetAllProductShopClientController {
    private readonly getAllProductShopClientService;
    constructor(getAllProductShopClientService: GetAllProductShopClientService);
    getAllProductShopClient(query: GetAllProductClientQueryDto, slug: string): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
