import { PrismaService } from "src/libs/prisma/prisma.service";
import { CreateProductDto } from "../dtos/create-product.dto";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
export declare class CreateProductService {
    private readonly prisma;
    private readonly supabase;
    constructor(prisma: PrismaService, supabase: SupabaseService);
    create(dto: CreateProductDto, images: any, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
