import { RejectRegisterSellersDto } from "../dtos/reject-register-seller.dto";
import { RejectRegisterSellerService } from "../services/rejectRegisterSeller.service";
export declare class RejectRegisterSellerController {
    private readonly RejectRegisterSellerService;
    constructor(RejectRegisterSellerService: RejectRegisterSellerService);
    rejectRegister(sellerID: string, dto: RejectRegisterSellersDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
