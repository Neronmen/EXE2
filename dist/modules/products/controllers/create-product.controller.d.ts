import type { File as MulterFile } from "multer";
import { CreateProductDto } from "../dtos/create-product.dto";
import { CreateProductService } from "../services/create-product.service";
export declare class CreateProductController {
    private readonly createProductService;
    constructor(createProductService: CreateProductService);
    createProduct(dto: CreateProductDto, files: {
        images?: MulterFile[];
    }, user: any, req: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
