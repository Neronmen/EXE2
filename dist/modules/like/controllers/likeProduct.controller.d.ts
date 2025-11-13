import { LikeAndUnlikeProductService } from "../services/likeProduct.service";
export declare class LikeAndUnlikeProductController {
    private readonly likeService;
    constructor(likeService: LikeAndUnlikeProductService);
    likeAndUnlikeProduct(productID: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
