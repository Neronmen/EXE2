import type { File as MulterFile } from "multer";
import { AddImageProductService } from "../services/add-new-image-product.service";
export declare class AddImageProductController {
    private readonly AddImageProductService;
    constructor(AddImageProductService: AddImageProductService);
    createProduct(id: number, files: {
        images?: MulterFile[];
    }, user: any, req: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
