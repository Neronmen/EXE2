import type { File as MulterFile } from 'multer';
import { UpdateProductCommentDto } from "../dtos/update-product-comment.dto";
import { UpdateProductCommentService } from "../services/update-comment-product.service";
export declare class UpdateCommentController {
    private readonly updateCommentService;
    constructor(updateCommentService: UpdateProductCommentService);
    updateComment(commentId: number, dto: UpdateProductCommentDto, files: {
        images?: MulterFile[];
    }, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
