import { GetDetailSellersRegisterSellerService } from "../services/getDetailRegisterSeller.service";
export declare class GetDetailProfileRegisterSellerController {
    private readonly GetDetailSellersRegisterSellerService;
    constructor(GetDetailSellersRegisterSellerService: GetDetailSellersRegisterSellerService);
    getDetailProfileRegister(sellerID: string): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
