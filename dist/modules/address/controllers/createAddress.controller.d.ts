import { CreateAddressDto } from "../dtos/create-address.dto";
import { CreateAddressService } from "../services/createAddress.service";
export declare class CreateAddressController {
    private readonly CreateAddressService;
    constructor(CreateAddressService: CreateAddressService);
    create(data: CreateAddressDto, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
