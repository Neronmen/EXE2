import type { File as MulterFile } from 'multer';
import { CreateProductCommentDto } from "../dtos/create-product-comment.dto";
import { CreateProductCommentService } from "../services/create-comment-product.service";
export declare class CreateCommentController {
    private readonly createCommentService;
    constructor(createCommentService: CreateProductCommentService);
    createShopReview(productId: number, dto: CreateProductCommentDto, files: {
        images?: MulterFile[];
    }, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
