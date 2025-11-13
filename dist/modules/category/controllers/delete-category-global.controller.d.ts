import { DeleteCategoryGlobalService } from "../services/delete-category-global.service";
export declare class DeleteCategoryController {
    private readonly DeleteCategoryGlobalService;
    constructor(DeleteCategoryGlobalService: DeleteCategoryGlobalService);
    DeleteCategoryGlobal(id: string): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
