import { DeleteProductCommentService } from "../services/delete-comment-product.service";
export declare class DeleteCommentController {
    private readonly deleteCommentService;
    constructor(deleteCommentService: DeleteProductCommentService);
    deleteComment(commentId: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
