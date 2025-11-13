import { ShopFollowerService } from "../services/followShop.service";
export declare class FollowShopController {
    private readonly shopFollowerService;
    constructor(shopFollowerService: ShopFollowerService);
    followShop(shopID: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
