import { GetDefaultAddressService } from "../services/getDefaultAddress.service";
export declare class GetDefaultAddressController {
    private readonly getDefaultAddressService;
    constructor(getDefaultAddressService: GetDefaultAddressService);
    getDefault(user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
