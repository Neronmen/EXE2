import { ShopReviewService } from "../services/getReviewShop.service";
export declare class GetReviewShopController {
    private readonly shopReviewService;
    constructor(shopReviewService: ShopReviewService);
    getShopReviews(sellerID: string, page: string, limit: string): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
