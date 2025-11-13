import { UnFollowerService } from "../services/unfollowShop.service";
export declare class UnFollowShopController {
    private readonly UnFollowerService;
    constructor(UnFollowerService: UnFollowerService);
    unfollowShop(sellerID: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
