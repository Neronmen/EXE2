import { PrismaService } from "src/libs/prisma/prisma.service";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
export declare class AddImageProductService {
    private readonly prisma;
    private readonly supabaseService;
    constructor(prisma: PrismaService, supabaseService: SupabaseService);
    addImage(id: number, files: any, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
