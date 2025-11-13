import { SellerProductService } from "../services/get-detail-product.service";
export declare class GetDetailProductController {
    private readonly productService;
    constructor(productService: SellerProductService);
    getDetailProduct(id: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
