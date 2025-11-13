import { DeleteProductService } from "../services/delete-product.service";
export declare class DeleteProductController {
    private readonly deleteProductService;
    constructor(deleteProductService: DeleteProductService);
    delete(id: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
