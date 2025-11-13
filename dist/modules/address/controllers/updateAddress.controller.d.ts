import { UpdateAddressDto } from "../dtos/update-address.dto";
import { UpdateAddressService } from "../services/updateAddress.service";
export declare class UpdateAddressController {
    private readonly UpdateAddressService;
    constructor(UpdateAddressService: UpdateAddressService);
    update(id: string, data: UpdateAddressDto, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
