import { PrismaService } from "src/libs/prisma/prisma.service";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
import { ResubmitSellerDto } from "src/modules/seller/dtos/resubmit-seller.dto";
export declare class UpdateProfileShopService {
    private readonly prisma;
    private readonly supabase;
    constructor(prisma: PrismaService, supabase: SupabaseService);
    updateProfileShop(dto: ResubmitSellerDto, files: any, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
