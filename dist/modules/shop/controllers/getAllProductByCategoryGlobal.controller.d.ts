import { GetAllProductClientQueryDto } from "../dtos/get-all-product.client.query";
import { GetAllProductByCategoryGlobalClientService } from "../services/getAllProductByCategoryGlobal.service";
export declare class GetAllProductByCategoryGlobalClientController {
    private readonly getAllProductByCategoryGlobalClientService;
    constructor(getAllProductByCategoryGlobalClientService: GetAllProductByCategoryGlobalClientService);
    getAllProductShopClient(query: GetAllProductClientQueryDto, id: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
