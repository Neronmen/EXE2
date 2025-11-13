import { PrismaService } from "src/libs/prisma/prisma.service";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
export declare class DeleteImageProductService {
    private readonly prisma;
    private readonly supabaseService;
    constructor(prisma: PrismaService, supabaseService: SupabaseService);
    deleteImage(productId: number, imageId: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
