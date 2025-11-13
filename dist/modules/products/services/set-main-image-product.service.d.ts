import { PrismaService } from "src/libs/prisma/prisma.service";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
export declare class SetMainImageProductService {
    private readonly prisma;
    private readonly supabaseService;
    constructor(prisma: PrismaService, supabaseService: SupabaseService);
    setMainImage(productId: number, imageId: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
