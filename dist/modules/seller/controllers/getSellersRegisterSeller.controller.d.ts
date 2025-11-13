import { GetSellersRegisterSellerService } from "../services/getSellersRegisterSeller.service";
import { GetAllSellersDto } from "../dtos/get-sellers-register-seller.dto";
export declare class GetSellersRegisterSellerController {
    private readonly GetSellersRegisterSellerService;
    constructor(GetSellersRegisterSellerService: GetSellersRegisterSellerService);
    getSellersRegisterSeller(query: GetAllSellersDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
