import { PrismaService } from "src/libs/prisma/prisma.service";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
import { GetAllCommentProductClientQueryDto } from "../dtos/get-alproduct-comment.dto";
export declare class GetAllCommentService {
    private readonly prisma;
    private readonly supabase;
    constructor(prisma: PrismaService, supabase: SupabaseService);
    getAll(productId: number, query: GetAllCommentProductClientQueryDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
