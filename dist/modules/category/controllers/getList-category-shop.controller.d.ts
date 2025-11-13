import { GetListCategoryShopService } from "../services/getList-category-shop.service";
export declare class GetListCategoryShopController {
    private readonly getListCategoryShopService;
    constructor(getListCategoryShopService: GetListCategoryShopService);
    getListCategoryShop(user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
