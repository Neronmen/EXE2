import { SetMainImageProductService } from "../services/set-main-image-product.service";
export declare class SetMainImageProductController {
    private readonly setMainImageProductService;
    constructor(setMainImageProductService: SetMainImageProductService);
    setMainProduct(id: number, imageId: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
