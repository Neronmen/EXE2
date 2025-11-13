import { GetShopListClientService } from "../services/getShopListClient.service";
import { GetShopClientDto } from "../dtos/get-shop-client.dto";
export declare class GetShopListClientController {
    private readonly GetShopListClientService;
    constructor(GetShopListClientService: GetShopListClientService);
    getShopClient(dto: GetShopClientDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
