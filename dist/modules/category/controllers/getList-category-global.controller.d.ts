import { FilterCategoryGlobalDto } from "../dtos/category-global.dto";
import { GetListCategoryGlobalService } from "../services/getList-category-global.service";
export declare class GetListCategoryController {
    private readonly GetListCategoryGlobalService;
    constructor(GetListCategoryGlobalService: GetListCategoryGlobalService);
    getListCategoryGlobal(query: FilterCategoryGlobalDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
