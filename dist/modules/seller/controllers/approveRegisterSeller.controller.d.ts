import { ApproveRegisterSellerService } from "../services/approveRegisterSeller.service";
export declare class ApproveRegisterSellerController {
    private readonly ApproveRegisterSellerService;
    constructor(ApproveRegisterSellerService: ApproveRegisterSellerService);
    approveRegister(sellerID: string): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
