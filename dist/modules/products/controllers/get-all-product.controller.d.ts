import { GetAllProductService } from "../services/get-all-product.service";
import { GetAllProductQueryDto } from "../dtos/get-all-product.query";
export declare class GetAllProductController {
    private readonly getAllProductService;
    constructor(getAllProductService: GetAllProductService);
    getAllProduct(query: GetAllProductQueryDto, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
