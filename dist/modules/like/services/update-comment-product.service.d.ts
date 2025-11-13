import { PrismaService } from "src/libs/prisma/prisma.service";
import { UpdateProductCommentDto } from "../dtos/update-product-comment.dto";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
export declare class UpdateProductCommentService {
    private readonly prisma;
    private readonly supabase;
    constructor(prisma: PrismaService, supabase: SupabaseService);
    updateComment(commentID: number, dto: UpdateProductCommentDto, userID: number, files: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
