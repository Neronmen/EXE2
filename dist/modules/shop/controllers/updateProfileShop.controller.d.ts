import type { File as MulterFile } from "multer";
import { ResubmitSellerDto } from "src/modules/seller/dtos/resubmit-seller.dto";
import { UpdateProfileShopService } from "../services/updateProfileShop.service";
export declare class UpdateShopController {
    private readonly UpdateProfileShopService;
    constructor(UpdateProfileShopService: UpdateProfileShopService);
    resubmitSeller(dto: ResubmitSellerDto, files: {
        shopAvatar?: MulterFile[];
        shopBanner?: MulterFile[];
    }, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
