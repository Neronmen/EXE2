import { CreateShopReviewDto } from "../dtos/create-review-shop.dto";
import type { File as MulterFile } from 'multer';
import { CreateShopReviewService } from "../services/createReviewShop.service";
export declare class CreateReviewShopController {
    private readonly CreateShopReviewService;
    constructor(CreateShopReviewService: CreateShopReviewService);
    createShopReview(dto: CreateShopReviewDto, files: {
        images?: MulterFile[];
    }, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
