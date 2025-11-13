import { PrismaService } from "src/libs/prisma/prisma.service";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
export declare class DeleteProductCommentService {
    private readonly prisma;
    private readonly supabase;
    constructor(prisma: PrismaService, supabase: SupabaseService);
    deleteComment(commentID: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
