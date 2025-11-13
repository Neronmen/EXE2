import { PrismaService } from "src/libs/prisma/prisma.service";
import { FilterCategoryGlobalDto } from "../dtos/category-global.dto";
export declare class GetListCategoryGlobalService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getListCategoryGlobal(filter: FilterCategoryGlobalDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
