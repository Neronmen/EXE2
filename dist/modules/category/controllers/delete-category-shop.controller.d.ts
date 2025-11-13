import { DeleteCategoryShopService } from "../services/delete-category-shop.service";
export declare class DeleteCategoryShopController {
    private readonly deleteCategoryShopService;
    constructor(deleteCategoryShopService: DeleteCategoryShopService);
    DeleteCategoryShop(id: string, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
