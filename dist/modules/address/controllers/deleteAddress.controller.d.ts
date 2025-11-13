import { DeleteAddressService } from "../services/deleteAddress.service";
export declare class DeleteAddressController {
    private readonly DeleteAddressService;
    constructor(DeleteAddressService: DeleteAddressService);
    Delete(id: string, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
