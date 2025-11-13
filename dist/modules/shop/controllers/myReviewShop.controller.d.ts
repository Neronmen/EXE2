import { MyShopReviewService } from "../services/myReviewShop.service";
export declare class MyReviewShopController {
    private readonly MyShopReviewService;
    constructor(MyShopReviewService: MyShopReviewService);
    myReviewShop(shopID: string, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
