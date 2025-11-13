import type { File as MulterFile } from "multer";
import { ResubmitSellerDto } from "../dtos/resubmit-seller.dto";
import { ResubmitRegisterSellerService } from "../services/resubmitRegisterSeller.service";
export declare class ResubmitRegisterSellerController {
    private readonly ResubmitRegisterSellerService;
    constructor(ResubmitRegisterSellerService: ResubmitRegisterSellerService);
    resubmitSeller(dto: ResubmitSellerDto, files: {
        idCardFront?: MulterFile[];
        idCardBack?: MulterFile[];
        businessLicense?: MulterFile[];
        foodSafetyCert?: MulterFile[];
    }, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
