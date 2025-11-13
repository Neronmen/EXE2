import { RegisterSellerService } from "../services/registerSeller.service";
import { RegisterSellerDto } from "../dtos/register-seller.dto";
import type { File as MulterFile } from 'multer';
export declare class RegisterSellerController {
    private readonly registerSellerService;
    constructor(registerSellerService: RegisterSellerService);
    registerSeller(dto: RegisterSellerDto, files: {
        idCardFront: MulterFile[];
        idCardBack: MulterFile[];
        businessLicense: MulterFile[];
        foodSafetyCert: MulterFile[];
    }, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
