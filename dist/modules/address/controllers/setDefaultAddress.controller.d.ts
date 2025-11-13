import { SetDefaultAddressService } from "../services/setDefaultAddress.service";
export declare class SetDefaultAddressController {
    private readonly setDefaultAddressService;
    constructor(setDefaultAddressService: SetDefaultAddressService);
    setDefault(id: string, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
