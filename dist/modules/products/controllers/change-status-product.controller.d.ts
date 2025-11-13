import { ChangeStatusProductService } from "../services/change-status-product.service";
export declare class ChangeStatusProductController {
    private readonly changeStatusProductService;
    constructor(changeStatusProductService: ChangeStatusProductService);
    changeStatus(id: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
