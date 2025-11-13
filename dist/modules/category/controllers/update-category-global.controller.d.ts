import { UpdateCategoryGlobalDto } from "../dtos/category-global.dto";
import { UpdateCategoryGlobalService } from "../services/update-category-global.service";
import type { File as MulterFile } from 'multer';
export declare class UpdateCategoryController {
    private readonly updateCategoryGlobalService;
    constructor(updateCategoryGlobalService: UpdateCategoryGlobalService);
    updateCategoryGlobal(files: {
        image?: MulterFile[];
    }, id: string, dto: UpdateCategoryGlobalDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
