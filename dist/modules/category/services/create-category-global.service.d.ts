import { PrismaService } from "src/libs/prisma/prisma.service";
import { CreateCategoryGlobalDto } from "../dtos/category-global.dto";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
export declare class CreateCategoryGlobalService {
    private readonly prisma;
    private readonly supabase;
    constructor(prisma: PrismaService, supabase: SupabaseService);
    createCategoryGlobal(files: any, dto: CreateCategoryGlobalDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
