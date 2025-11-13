import { UpdateProductDto } from "../dtos/update-product.dto";
import { UpdateProductService } from "../services/update-product.service";
export declare class UpdateProductController {
    private readonly updateProductService;
    constructor(updateProductService: UpdateProductService);
    updateProduct(productId: number, dto: UpdateProductDto, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
