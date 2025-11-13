import { GetDetailCategoryShopService } from "../services/getDetail-category-shop.service";
export declare class GetDetailCategoryShopController {
    private readonly getDetailCategoryShopService;
    constructor(getDetailCategoryShopService: GetDetailCategoryShopService);
    getDetailCategoryShop(id: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
