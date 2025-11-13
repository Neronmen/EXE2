import { GetAllCommentProductClientQueryDto } from "../dtos/get-alproduct-comment.dto";
import { GetAllCommentService } from "../services/get-all-comment-product.service";
export declare class GetAllCommentController {
    private readonly getAllCommentService;
    constructor(getAllCommentService: GetAllCommentService);
    getAllComment(productId: number, query: GetAllCommentProductClientQueryDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
