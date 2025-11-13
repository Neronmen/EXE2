import { PrismaService } from "src/libs/prisma/prisma.service";
import { CreateProductCommentDto } from "../dtos/create-product-comment.dto";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
export declare class CreateProductCommentService {
    private readonly prisma;
    private readonly supabase;
    constructor(prisma: PrismaService, supabase: SupabaseService);
    createComment(productId: number, dto: CreateProductCommentDto, userId: number, files: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
