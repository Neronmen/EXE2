import type { File as MulterFile } from "multer";
import { UpdateShopReviewDto } from "../dtos/update-review-shop.dto";
import { UpdateShopReviewService } from "../services/updateReviewShop.service";
export declare class UpdateReviewShopController {
    private readonly UpdateShopReviewService;
    constructor(UpdateShopReviewService: UpdateShopReviewService);
    updateShopReview(id: number, dto: UpdateShopReviewDto, files: {
        images?: MulterFile[];
    }, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
