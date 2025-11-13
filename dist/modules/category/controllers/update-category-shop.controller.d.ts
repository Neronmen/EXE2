import type { File as MulterFile } from 'multer';
import { UpdateCategoryShopDto } from "../dtos/category-shop.dto";
import { UpdateCategoryShopService } from "../services/update-category-shop.service";
export declare class UpdateCategoryShopController {
    private readonly updateCategoryShopService;
    constructor(updateCategoryShopService: UpdateCategoryShopService);
    updateCategoryShop(files: {
        image?: MulterFile[];
    }, id: string, dto: UpdateCategoryShopDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
