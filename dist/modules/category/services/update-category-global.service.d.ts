import { PrismaService } from "src/libs/prisma/prisma.service";
import { UpdateCategoryGlobalDto } from "../dtos/category-global.dto";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
export declare class UpdateCategoryGlobalService {
    private readonly prisma;
    private readonly supabase;
    constructor(prisma: PrismaService, supabase: SupabaseService);
    UpdateCategoryGlobal(files: any, id: number, dto: UpdateCategoryGlobalDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
