import { CreateCategoryShopDto } from "../dtos/category-shop.dto";
import { CreateCategoryShopService } from "../services/create-category-shop.service";
import type { File as MulterFile } from 'multer';
export declare class CreateCategoryShopController {
    private readonly createCategoryShopService;
    constructor(createCategoryShopService: CreateCategoryShopService);
    createCategoryShop(files: {
        image?: MulterFile[];
    }, dto: CreateCategoryShopDto, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
