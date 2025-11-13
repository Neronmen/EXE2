import { GetDetailCategoryShopClientService } from "../services/getCategoryShop.service";
export declare class GetCategoryShopClientController {
    private readonly getDetailCategoryShopClientService;
    constructor(getDetailCategoryShopClientService: GetDetailCategoryShopClientService);
    getDetailCategoryShopClient(categoryID: number, slug: string): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
