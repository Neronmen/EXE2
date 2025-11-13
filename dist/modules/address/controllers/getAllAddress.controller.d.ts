import { GetAllAddressService } from "../services/getAllAddress.service";
export declare class GetAllAddressController {
    private readonly getAllAddressService;
    constructor(getAllAddressService: GetAllAddressService);
    findAll(user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
