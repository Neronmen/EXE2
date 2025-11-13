import { CreateCategoryGlobalDto } from "../dtos/category-global.dto";
import { CreateCategoryGlobalService } from "../services/create-category-global.service";
import type { File as MulterFile } from 'multer';
export declare class CreateCategoryController {
    private readonly CreateCategoryGlobalService;
    constructor(CreateCategoryGlobalService: CreateCategoryGlobalService);
    createCategoryGlobal(files: {
        image?: MulterFile[];
    }, dto: CreateCategoryGlobalDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
