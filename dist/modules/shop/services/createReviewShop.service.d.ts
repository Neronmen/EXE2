import { PrismaService } from 'src/libs/prisma/prisma.service';
import { SupabaseService } from 'src/modules/common/subapase/supabase.service';
import { CreateShopReviewDto } from '../dtos/create-review-shop.dto';
export declare class CreateShopReviewService {
    private prisma;
    private supabase;
    constructor(prisma: PrismaService, supabase: SupabaseService);
    createReview(dto: CreateShopReviewDto, files: any, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
