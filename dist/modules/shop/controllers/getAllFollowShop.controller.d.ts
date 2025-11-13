import { ListShopFollowerService } from "../services/getAllFollowShop.service";
export declare class ListFollowShopController {
    private readonly ListShopFollowerService;
    constructor(ListShopFollowerService: ListShopFollowerService);
    listfollowShop(shopID: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
