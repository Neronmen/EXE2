import { DeleteImageProductService } from "../services/delete-image-product.service";
export declare class DeleteImageProductController {
    private readonly deleteImageProductService;
    constructor(deleteImageProductService: DeleteImageProductService);
    deleteProduct(id: number, imageId: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
