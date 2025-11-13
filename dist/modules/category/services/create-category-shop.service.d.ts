import { PrismaService } from "src/libs/prisma/prisma.service";
import { CreateCategoryShopDto } from "../dtos/category-shop.dto";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
export declare class CreateCategoryShopService {
    private readonly prisma;
    private readonly supabase;
    constructor(prisma: PrismaService, supabase: SupabaseService);
    createCategoryShop(files: any, dto: CreateCategoryShopDto, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
