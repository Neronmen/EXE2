import { ViewUserLikeProductService } from "../services/view-users-like-product.service";
export declare class ViewUsersLikeProductProductController {
    private readonly viewUserLikeProductService;
    constructor(viewUserLikeProductService: ViewUserLikeProductService);
    viewLikes(id: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
