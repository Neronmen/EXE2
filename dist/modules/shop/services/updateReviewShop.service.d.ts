import { UpdateShopReviewDto } from "../dtos/update-review-shop.dto";
import type { File as MulterFile } from "multer";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class UpdateShopReviewService {
    private prisma;
    private supabase;
    constructor(prisma: PrismaService, supabase: SupabaseService);
    updateReview(id: number, dto: UpdateShopReviewDto, files: {
        images?: MulterFile[];
    }, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
