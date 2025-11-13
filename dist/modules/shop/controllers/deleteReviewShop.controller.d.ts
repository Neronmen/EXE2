import { DeleteReviewService } from "../services/deleteReviewShop.service";
export declare class DeleteReviewShopController {
    private readonly DeleteReviewService;
    constructor(DeleteReviewService: DeleteReviewService);
    deleteReviewShop(reviewID: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
