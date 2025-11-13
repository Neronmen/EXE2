import { PrismaService } from "src/libs/prisma/prisma.service";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
import { UpdateCategoryShopDto } from "../dtos/category-shop.dto";
export declare class UpdateCategoryShopService {
    private readonly prisma;
    private readonly supabase;
    constructor(prisma: PrismaService, supabase: SupabaseService);
    UpdateCategoryShop(files: any, id: number, dto: UpdateCategoryShopDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
