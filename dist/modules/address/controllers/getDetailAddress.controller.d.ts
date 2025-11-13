import { GetDetailAddressService } from "../services/getDetailAddress.service";
export declare class GetDetailAddressController {
    private readonly GetDetailAddressService;
    constructor(GetDetailAddressService: GetDetailAddressService);
    detail(id: string, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
